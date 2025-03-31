import { HTMLAttributes } from "react";

import { useFieldContext } from "@/components/form-fields/form-context";
import {
  DateTimeValue,
  FormDateTimeField,
} from "@/components/form/date-time-field";

type DateTimeFieldProps<T extends DateTimeValue = Date> = Omit<
  HTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> & {
  id?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  min?: DateTimeValue;
  max?: DateTimeValue;
  as?: T extends Date ? "date" : T extends string ? "iso" : "date";
  timezone?: string;
  clearable?: boolean;
  field: { state: { value: T } };
};

export function DateTimeField<T extends DateTimeValue = Date>(
  props: DateTimeFieldProps<T>,
) {
  const field = useFieldContext<T>();
  const id = props.id ?? `${field.name}`;

  return (
    <FormDateTimeField
      id={id}
      value={field.state.value}
      onChange={(value) => field.handleChange(value)}
      onBlur={field.handleBlur}
      label={props.label}
      disabled={props.disabled}
      className={props.className}
      min={props.min}
      max={props.max}
      as={props.as}
      timezone={props.timezone}
      clearable={props.clearable}
    />
  );
}
