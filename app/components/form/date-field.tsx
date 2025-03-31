import { HTMLAttributes, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type DateValue = Date | string | number | null | undefined; // number is unix timestamp in milliseconds

export type TimeSettings = {
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
};

// Use a simple string with runtime validation instead of complex template literals
export type TimeString = string;

export type TimeValue = TimeSettings | TimeString | number; // string in HH:MM format, number in seconds

export type FormDateFieldProps<T extends DateValue = Date> = Omit<
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
  min?: DateValue;
  max?: DateValue;
  as?: T extends Date ? "date" : T extends string ? "iso" : "date";
  time?: TimeValue;
  timezone?: string; // e.g. 'America/New_York', 'Europe/London'
  clearable?: boolean;
};

// Convert DateValue to Temporal.PlainDate
function toPlainDate(dateValue: DateValue): Temporal.PlainDate {
  if (dateValue === null || dateValue === undefined) {
    // Default to current date for null/undefined values - only for internal calculations
    const now = new Date();
    return Temporal.PlainDate.from({
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
    });
  }

  if (dateValue instanceof Date) {
    return Temporal.PlainDate.from({
      year: dateValue.getFullYear(),
      month: dateValue.getMonth() + 1, // JS Date is 0-indexed for months
      day: dateValue.getDate(),
    });
  } else if (typeof dateValue === "string") {
    return Temporal.PlainDate.from(dateValue);
  } else {
    // Convert unix timestamp to PlainDate
    const date = new Date(dateValue);
    return Temporal.PlainDate.from({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });
  }
}

// Convert Temporal.PlainDate to ISO string format (YYYY-MM-DD)
function plainDateToISOString(date: Temporal.PlainDate): string {
  return date.toString();
}

// Convert TimeValue to Temporal.PlainTime
function toPlainTime(timeValue?: TimeValue): Temporal.PlainTime {
  if (!timeValue) {
    // Default to 0 time if not provided
    return Temporal.PlainTime.from({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
  }

  if (typeof timeValue === "string") {
    try {
      // Try to parse directly first
      return Temporal.PlainTime.from(timeValue);
    } catch (e) {
      // If direct parsing fails, try with regex for common formats
      if (/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/.test(timeValue)) {
        const parts = timeValue.split(":");
        return Temporal.PlainTime.from({
          hour: parseInt(parts[0], 10),
          minute: parseInt(parts[1], 10),
          second: parts.length > 2 ? parseInt(parts[2], 10) : 0,
          millisecond: 0,
        });
      }
      // If all parsing attempts fail, return default time
      console.error("Invalid time string format:", timeValue);
      return Temporal.PlainTime.from({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      });
    }
  } else if (typeof timeValue === "number") {
    // Convert seconds since midnight to PlainTime
    const hours = Math.floor(timeValue / 3600);
    const minutes = Math.floor((timeValue % 3600) / 60);
    const seconds = timeValue % 60;
    return Temporal.PlainTime.from({
      hour: hours,
      minute: minutes,
      second: seconds,
    });
  } else if (typeof timeValue === "object") {
    return Temporal.PlainTime.from({
      hour: timeValue.hours ?? 0,
      minute: timeValue.minutes ?? 0,
      second: timeValue.seconds ?? 0,
      millisecond: timeValue.milliseconds ?? 0,
    });
  }

  // Fallback to default time
  return Temporal.PlainTime.from({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });
}

// Create ZonedDateTime from PlainDate, PlainTime and timezone
function createZonedDateTime(
  plainDate: Temporal.PlainDate,
  plainTime: Temporal.PlainTime,
  timezone?: string,
): Temporal.ZonedDateTime {
  const timeZone = timezone || "UTC"; // Default to UTC
  const plainDateTime = plainDate.toPlainDateTime(plainTime);
  return plainDateTime.toZonedDateTime(timeZone);
}

// Convert from Temporal to DateValue output
function temporalToOutput<T extends DateValue>(
  temporal: Temporal.ZonedDateTime | Temporal.PlainDate,
  originalValue: T,
): T {
  if (typeof originalValue === "number") {
    // Convert to unix timestamp in milliseconds
    if (temporal instanceof Temporal.ZonedDateTime) {
      return temporal.epochMilliseconds as T;
    } else {
      // For PlainDate, create a ZonedDateTime first
      const zdt = temporal
        .toPlainDateTime({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
        })
        .toZonedDateTime("UTC"); // Use UTC for consistency
      return zdt.epochMilliseconds as T;
    }
  } else if (originalValue instanceof Date) {
    if (temporal instanceof Temporal.ZonedDateTime) {
      return new Date(temporal.epochMilliseconds) as T;
    } else {
      const isoString = temporal.toString();
      return new Date(isoString) as T;
    }
  } else {
    // Must be string
    if (temporal instanceof Temporal.ZonedDateTime) {
      return temporal.toString() as T;
    } else {
      return temporal.toString() as T;
    }
  }
}

function isValidISODate(value: string): boolean {
  try {
    Temporal.PlainDate.from(value);
    return true;
  } catch {
    return false;
  }
}

function isValidTimeString(value: string): boolean {
  try {
    Temporal.PlainTime.from(value);
    return true;
  } catch {
    return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/.test(value);
  }
}

export function FormDateField<T extends DateValue = Date>(
  props: FormDateFieldProps<T>,
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
        : "date") as FormDateFieldProps<T>["as"],
    time,
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
      const plainDate = toPlainDate(value);
      setDisplayValue(plainDateToISOString(plainDate));
    } catch (e) {
      console.error("Error converting date value:", e);
      setDisplayValue("");
    }
  }, [value]);

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

    if (isValidISODate(inputValue)) {
      try {
        // Create Temporal.PlainDate from input
        const plainDate = Temporal.PlainDate.from(inputValue);

        // Convert time to Temporal.PlainTime (defaults to 0 time if not provided)
        const plainTime = toPlainTime(time);

        // Create a ZonedDateTime with UTC as default timezone
        const zonedDateTime = createZonedDateTime(
          plainDate,
          plainTime,
          timezone,
        );

        // Check min and max constraints if any
        if (min !== undefined) {
          const minPlainDate = toPlainDate(min);
          if (Temporal.PlainDate.compare(plainDate, minPlainDate) < 0) return;
        }

        if (max !== undefined) {
          const maxPlainDate = toPlainDate(max);
          if (Temporal.PlainDate.compare(plainDate, maxPlainDate) > 0) return;
        }

        // Convert back to the original type
        const outputValue = temporalToOutput<T>(
          timezone || time ? zonedDateTime : plainDate,
          value,
        );

        onChange(outputValue);
      } catch (e) {
        console.error("Error handling date change:", e);
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
          const plainDate = toPlainDate(value);
          setDisplayValue(plainDateToISOString(plainDate));
        } catch {
          setDisplayValue("");
        }
      }
      onBlur?.();
      return;
    }

    // Invalid value handling
    if (!isValidISODate(displayValue)) {
      // Reset to last valid value
      if (value === null || value === undefined) {
        setDisplayValue("");
      } else {
        try {
          const plainDate = toPlainDate(value);
          setDisplayValue(plainDateToISOString(plainDate));
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
        type="date"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        {...restProps}
      />
    </div>
  );
}
