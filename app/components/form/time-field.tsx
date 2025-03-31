import { HTMLAttributes, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type TimeValue = number | string | null | undefined;

// Enhanced type definitions with generics to maintain type consistency
export type FormTimeFieldProps<T extends TimeValue = number> = Omit<
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
  min?: TimeValue;
  max?: TimeValue;
  clearable?: boolean;
  as?: T extends number ? "seconds" : T extends string ? "iso" : "seconds";
};

/**
 * Convert a time value to seconds
 * - If the value is a number, it's assumed to already be in seconds
 * - If the value is a string in HH:MM format, it's converted to seconds
 * - If the value is null or undefined, returns 0
 */
function convertToSeconds(timeValue: TimeValue): number {
  if (timeValue === null || timeValue === undefined) return 0;
  if (typeof timeValue === "number") return timeValue;

  // Handle HH:MM format
  try {
    const [hours, minutes] = timeValue.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) {
      console.warn("Invalid time format:", timeValue);
      return 0;
    }
    return hours * 3600 + minutes * 60;
  } catch (e) {
    console.warn("Error parsing time:", timeValue, e);
    return 0;
  }
}

/**
 * Convert seconds to HH:MM format for the time input
 * @param seconds The number of seconds to convert
 * @returns A string in the format "HH:MM"
 */
function secondsToTimeFormat(seconds: number): string {
  // Ensure we have a valid number
  if (isNaN(seconds) || seconds < 0) {
    console.warn("Invalid seconds value:", seconds);
    return "00:00";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

/**
 * Check if a string is a valid HH:MM time format
 */
function isValidTimeFormat(value: string): boolean {
  return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
}

export function FormTimeField<T extends TimeValue = number>(
  props: FormTimeFieldProps<T>,
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
    clearable = true,
    as = (typeof value === "string"
      ? "iso"
      : "seconds") as FormTimeFieldProps<T>["as"],
    ...restProps
  } = props;

  // Track the input display value
  const [displayValue, setDisplayValue] = useState<string>("");

  // Sync the display with the actual value
  useEffect(() => {
    if (value === null || value === undefined) {
      setDisplayValue("");
      return;
    }

    // For string values (HH:MM format)
    if (typeof value === "string") {
      // If it's already a valid time string, use it directly
      if (isValidTimeFormat(value)) {
        setDisplayValue(value);
      } else {
        console.warn("Invalid time string format:", value);
        setDisplayValue("00:00");
      }
    } else if (typeof value === "number") {
      // For number values, convert seconds to HH:MM for display
      setDisplayValue(secondsToTimeFormat(value));
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Always update display value for responsive UI
    setDisplayValue(inputValue);

    // If input is cleared and clearable is true, set to null/undefined
    if (inputValue === "" && clearable) {
      // Preserve the original type (null or undefined)
      if (value === null) {
        (onChange as (value: null) => void)(null);
      } else if (value === undefined) {
        (onChange as (value: undefined) => void)(undefined);
      } else if (as === "iso" || typeof value === "string") {
        // For string values, default to empty string when clearing
        (onChange as (value: string) => void)("" as any);
      } else {
        // For number values, default to null when clearing
        (onChange as (value: null) => void)(null);
      }
      return;
    }

    if (isValidTimeFormat(inputValue)) {
      if (
        as === "iso" ||
        typeof value === "string" ||
        value === null ||
        value === undefined
      ) {
        // String mode (HH:MM format) or null/undefined converted to string based on 'as' prop
        // Check min/max constraints
        const secondsValue = convertToSeconds(inputValue);
        const minSeconds =
          min !== undefined ? convertToSeconds(min) : undefined;
        const maxSeconds =
          max !== undefined ? convertToSeconds(max) : undefined;

        if (minSeconds !== undefined && secondsValue < minSeconds) return;
        if (maxSeconds !== undefined && secondsValue > maxSeconds) return;

        // Return the HH:MM string
        (onChange as (value: string) => void)(inputValue as any);
      } else {
        // Number mode (seconds)
        // Convert HH:MM to seconds
        const secondsValue = convertToSeconds(inputValue);

        // Check min/max constraints
        const minSeconds =
          min !== undefined ? convertToSeconds(min) : undefined;
        const maxSeconds =
          max !== undefined ? convertToSeconds(max) : undefined;

        if (minSeconds !== undefined && secondsValue < minSeconds) return;
        if (maxSeconds !== undefined && secondsValue > maxSeconds) return;

        // Return seconds
        (onChange as (value: number) => void)(secondsValue as any);
      }
    }
  };

  const handleBlur = () => {
    // If display is empty and clearable, keep it empty
    if (displayValue === "" && clearable) {
      if (value === null || value === undefined) {
        // Already cleared, do nothing
      } else {
        // Clear the value if not already cleared
        if (value === null) {
          (onChange as (value: null) => void)(null);
        } else if (value === undefined) {
          (onChange as (value: undefined) => void)(undefined);
        } else if (as === "iso" || typeof value === "string") {
          // For string values, default to empty string when clearing
          (onChange as (value: string) => void)("" as any);
        } else {
          // For number values, default to null when clearing
          (onChange as (value: null) => void)(null);
        }
      }
      onBlur?.();
      return;
    }

    // On blur, if the current input is invalid, reset to the last valid value
    if (!isValidTimeFormat(displayValue)) {
      if (value === null || value === undefined) {
        setDisplayValue("");
      } else if (typeof value === "number") {
        setDisplayValue(secondsToTimeFormat(value as number));
      } else if (
        typeof value === "string" &&
        isValidTimeFormat(value as string)
      ) {
        setDisplayValue(value as string);
      } else {
        setDisplayValue("00:00");
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
        type="time"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder="HH:MM"
        {...restProps}
      />
    </div>
  );
}
