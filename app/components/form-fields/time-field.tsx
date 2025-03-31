import { HTMLAttributes } from "react";

import { useFieldContext } from "@/components/form-fields/form-context";
import { FormTimeField, TimeValue } from "@/components/form/time-field";

type TimeFieldProps<T extends TimeValue = number> = Omit<
  HTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> & {
  id?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  min?: TimeValue;
  max?: TimeValue;
  clearable?: boolean;
  as?: T extends number ? "seconds" : T extends string ? "iso" : "seconds";
  field: { state: { value: T } };
};

export function TimeField<T extends TimeValue = number>(
  props: TimeFieldProps<T>,
) {
  const field = useFieldContext<T>();
  const id = props.id ?? `${field.name}`;

  return (
    <FormTimeField
      id={id}
      value={field.state.value}
      onChange={(value) => field.handleChange(value)}
      onBlur={field.handleBlur}
      label={props.label}
      disabled={props.disabled}
      className={props.className}
      min={props.min}
      max={props.max}
      clearable={props.clearable}
      as={props.as}
    />
  );
}
