import { HTMLAttributes } from "react";

import { useFieldContext } from "@/components/form-fields/form-context";
import {
  DateValue,
  FormDateField,
  TimeValue,
} from "@/components/form/date-field";

type DateFieldProps<T extends DateValue = Date> = Omit<
  HTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> & {
  id?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  min?: DateValue;
  max?: DateValue;
  as?: T extends Date ? "date" : T extends string ? "iso" : "date";
  time?: TimeValue;
  timezone?: string;
  clearable?: boolean;
  field: { state: { value: T } };
};

export function DateField<T extends DateValue = Date>(
  props: DateFieldProps<T>,
) {
  const field = useFieldContext<T>();
  const id = props.id ?? `${field.name}`;

  return (
    <FormDateField
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
      time={props.time}
      timezone={props.timezone}
      clearable={props.clearable}
    />
  );
}
