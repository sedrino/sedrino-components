import { HTMLAttributes, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { TimeString, TimeValue } from "./date-field";

export type DateTimeValue = Date | string | number | null | undefined;

export type FormDateTimeFieldProps<T extends DateTimeValue = Date> = Omit<
  HTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> & {
  value: T;
  onChange: (value: T) => void;
  onBlur?: () => void;
  id?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  min?: DateTimeValue;
  max?: DateTimeValue;
  as?: T extends Date ? "date" : T extends string ? "iso" : "date";
  timezone?: string; // e.g. 'America/New_York', 'Europe/London', if not provided uses local browser timezone
  clearable?: boolean;
};

// Get current timezone from browser
function getCurrentTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// Convert DateTimeValue to Temporal.ZonedDateTime (preserving timezone information)
function toZonedDateTime(
  dateValue: DateTimeValue,
  timezone?: string,
): Temporal.ZonedDateTime {
  const resolvedTimezone = timezone || getCurrentTimezone();

  if (dateValue === null || dateValue === undefined) {
    // Default to current date/time in the target timezone for internal calculations
    return Temporal.Now.zonedDateTimeISO(resolvedTimezone);
  }

  if (dateValue instanceof Date) {
    // For Date objects, use the exact timestamp but interpret in the target timezone
    return Temporal.Instant.fromEpochMilliseconds(
      dateValue.getTime(),
    ).toZonedDateTimeISO(resolvedTimezone);
  } else if (typeof dateValue === "string") {
    try {
      // Try to parse as ISO string with timezone information
      return Temporal.ZonedDateTime.from(dateValue);
    } catch {
      // If that fails, parse as PlainDateTime and then convert to the target timezone
      try {
        const plainDateTime = Temporal.PlainDateTime.from(dateValue);
        return plainDateTime.toZonedDateTime(resolvedTimezone);
      } catch (e) {
        console.error("Failed to parse date string:", dateValue);
        // Fallback: current date/time in the target timezone
        return Temporal.Now.zonedDateTimeISO(resolvedTimezone);
      }
    }
  } else {
    // For unix timestamp (milliseconds), convert to Instant then to ZonedDateTime
    return Temporal.Instant.fromEpochMilliseconds(dateValue).toZonedDateTimeISO(
      resolvedTimezone,
    );
  }
}

// Convert to PlainDateTime in user's timezone for the input element
function zonedDateTimeToLocalPlainDateTime(
  zdt: Temporal.ZonedDateTime,
): Temporal.PlainDateTime {
  return zdt.toPlainDateTime();
}

// Convert Temporal.PlainDateTime to ISO string format (YYYY-MM-DDTHH:MM) for the input
function plainDateTimeToInputString(dateTime: Temporal.PlainDateTime): string {
  return dateTime.toString().slice(0, 16); // Trim to just YYYY-MM-DDTHH:MM
}

// Convert from Temporal to DateTimeValue output
function temporalToOutput<T extends DateTimeValue>(
  temporal: Temporal.ZonedDateTime,
  originalValue: T,
): T {
  if (typeof originalValue === "number") {
    // Convert to unix timestamp in milliseconds
    return temporal.epochMilliseconds as T;
  } else if (originalValue instanceof Date) {
    return new Date(temporal.epochMilliseconds) as T;
  } else {
    // Must be string - return ISO format
    return temporal.toString() as T;
  }
}

function isValidISODateTime(value: string): boolean {
  try {
    Temporal.PlainDateTime.from(value);
    return true;
  } catch {
    return false;
  }
}

export function FormDateTimeField<T extends DateTimeValue = Date>(
  props: FormDateTimeFieldProps<T>,
) {
  const {
    value,
    onChange,
    onBlur,
    id,
    label,
    disabled,
    className,
    min,
    max,
    as = (value instanceof Date
      ? "date"
      : typeof value === "string"
        ? "iso"
        : "date") as FormDateTimeFieldProps<T>["as"],
    timezone,
    clearable = true,
    ...restProps
  } = props;

  const [displayValue, setDisplayValue] = useState<string>("");

  // Keep the UI display in sync with the value
  useEffect(() => {
    if (value === null || value === undefined) {
      setDisplayValue("");
      return;
    }

    try {
      // Convert to ZonedDateTime in the specified or local timezone
      const zonedDateTime = toZonedDateTime(value, timezone);

      // Convert to local PlainDateTime for display in the input
      const localDateTime = zonedDateTimeToLocalPlainDateTime(zonedDateTime);

      // Format for the input element
      setDisplayValue(plainDateTimeToInputString(localDateTime));
    } catch (e) {
      console.error("Error converting datetime value:", e);
      setDisplayValue("");
    }
  }, [value, timezone]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDisplayValue(inputValue);

    if (inputValue === "") {
      if (clearable) {
        // Preserve the original type (null or undefined)
        if (value === null) {
          (onChange as (value: null) => void)(null);
        } else if (value === undefined) {
          (onChange as (value: undefined) => void)(undefined);
        } else {
          // Default to null for other values when clearing
          (onChange as (value: null) => void)(null);
        }
      }
      return;
    }

    if (isValidISODateTime(inputValue)) {
      try {
        // Create PlainDateTime from input
        const plainDateTime = Temporal.PlainDateTime.from(inputValue);

        // Convert to ZonedDateTime in the user's timezone or specified timezone
        const userTimezone = timezone || getCurrentTimezone();
        const zonedDateTime = plainDateTime.toZonedDateTime(userTimezone);

        // Check min and max constraints if any
        if (min !== undefined) {
          const minZonedDateTime = toZonedDateTime(min, timezone);
          if (
            zonedDateTime.epochMilliseconds < minZonedDateTime.epochMilliseconds
          )
            return;
        }

        if (max !== undefined) {
          const maxZonedDateTime = toZonedDateTime(max, timezone);
          if (
            zonedDateTime.epochMilliseconds > maxZonedDateTime.epochMilliseconds
          )
            return;
        }

        // Convert back to the original type (will be Unix timestamp for numeric types)
        const outputValue = temporalToOutput<T>(zonedDateTime, value);
        onChange(outputValue);
      } catch (e) {
        console.error("Error handling datetime change:", e);
      }
    }
  };

  const handleBlur = () => {
    // Empty value handling
    if (displayValue === "") {
      if (clearable) {
        if (value === null || value === undefined) {
          // Already cleared, do nothing
        } else {
          // Clear the value if not already cleared
          if (value === null) {
            (onChange as (value: null) => void)(null);
          } else if (value === undefined) {
            (onChange as (value: undefined) => void)(undefined);
          } else {
            // Default to null for other values
            (onChange as (value: null) => void)(null);
          }
        }
      } else {
        // If not clearable, reset to last valid value
        try {
          const zonedDateTime = toZonedDateTime(value, timezone);
          const localDateTime =
            zonedDateTimeToLocalPlainDateTime(zonedDateTime);
          setDisplayValue(plainDateTimeToInputString(localDateTime));
        } catch {
          setDisplayValue("");
        }
      }
      onBlur?.();
      return;
    }

    // Invalid value handling
    if (!isValidISODateTime(displayValue)) {
      // Reset to last valid value
      if (value === null || value === undefined) {
        setDisplayValue("");
      } else {
        try {
          const zonedDateTime = toZonedDateTime(value, timezone);
          const localDateTime =
            zonedDateTimeToLocalPlainDateTime(zonedDateTime);
          setDisplayValue(plainDateTimeToInputString(localDateTime));
        } catch {
          setDisplayValue("");
        }
      }
    }
    onBlur?.();
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}
      <Input
        id={id}
        type="datetime-local"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        {...restProps}
      />
    </div>
  );
}
