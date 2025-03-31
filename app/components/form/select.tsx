import { useMemo } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createValueMapsFromOptions, PrimitiveValueType } from "./form-utils";

export type FormSelectProps<T extends PrimitiveValueType> = {
  value: T;
  onValueChange: (value: T) => void;
  className?: string;
  placeholder?: string;
  /** Array of options with value and label */
  options: Array<{
    value: T;
    label: string;
  }>;
  clearLabel?: string;
  clearable?: boolean;
  disabled?: boolean;
};

export function FormSelect<T extends PrimitiveValueType>(
  props: FormSelectProps<T>,
) {
  // Radix does not support empty string as a value so we are going to handle it.
  // Map special values to string representations to ensure they work with Radix Select
  const { valueToString, stringToValue } = useMemo(() => {
    return createValueMapsFromOptions(props.options);
  }, [props.options]);

  return (
    <Select
      disabled={props.disabled}
      value={valueToString.get(props.value)}
      onValueChange={(val) =>
        props.onValueChange(stringToValue.get(val) ?? (null as unknown as T))
      }
    >
      <SelectTrigger className={props.className}>
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {props.clearable && (
          <SelectItem value="_clear">{props.clearLabel ?? "Clear"}</SelectItem>
        )}
        {props.options.map((option) => (
          <SelectItem
            key={String(option.value)}
            value={valueToString.get(option.value) ?? ""}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
