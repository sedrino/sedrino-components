import { HTMLAttributes, useEffect, useMemo, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

import { createValueMapsFromOptions, PrimitiveValueType } from "./form-utils";

export type Option<T extends PrimitiveValueType> = {
  label: string;
  value: T;
};

export type FormCheckboxGroupProps<T extends PrimitiveValueType> =
  HTMLAttributes<HTMLDivElement> & {
    value: T[];
    onChange: (value: T[]) => void;
    onBlur?: () => void;
    options: Option<T>[];
    label?: string;
    className?: string;
    disabled?: boolean;
    orientation?: "horizontal" | "vertical";
  };

export function FormCheckboxGroup<T extends PrimitiveValueType>(
  props: FormCheckboxGroupProps<T>,
) {
  const {
    value,
    onChange,
    onBlur,
    options,
    label,
    className,
    disabled,
    orientation = "vertical",
    ...restProps
  } = props;

  const [selectedValues, setSelectedValues] = useState<T[]>([]);

  // Create maps to convert between primitive values and string representations
  const { valueToString, stringToValue } = useMemo(() => {
    return createValueMapsFromOptions(options);
  }, [options]);

  // Keep the UI display in sync with the value
  useEffect(() => {
    setSelectedValues(value || []);
  }, [value]);

  const handleCheckedChange = (checked: boolean, optionValue: T) => {
    let newValues: T[];

    if (checked) {
      newValues = [...selectedValues, optionValue];
    } else {
      // Using a loose equality check to handle things like 1 and "1"
      newValues = selectedValues.filter((v) => v !== optionValue);
    }

    onChange(newValues);
  };

  // Helper to check if a value is in the selected values
  const isValueSelected = (optionValue: T): boolean => {
    return selectedValues.some((v) => v === optionValue);
  };

  return (
    <div className={className} {...restProps}>
      {label && <div className="mb-2 font-medium">{label}</div>}
      <div
        className={cn(
          orientation === "vertical"
            ? "flex flex-col space-y-2"
            : "flex flex-row flex-wrap gap-4",
        )}
      >
        {options.map((option) => {
          const stringValue =
            valueToString.get(option.value) || String(option.value);
          const id = `checkbox-${stringValue}`;
          const isChecked = isValueSelected(option.value);

          return (
            <div key={stringValue} className="flex items-center space-x-2">
              <Checkbox
                id={id}
                checked={isChecked}
                onCheckedChange={(checked) =>
                  handleCheckedChange(!!checked, option.value)
                }
                disabled={disabled}
                onBlur={onBlur}
              />
              <label
                htmlFor={id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
