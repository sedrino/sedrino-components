import { HTMLAttributes } from "react";

import { useFieldContext } from "@/components/form-fields/form-context";
import { FormCheckboxGroup, Option } from "@/components/form/checkbox-group";
import { PrimitiveValueType } from "@/components/form/form-utils";

type CheckboxGroupFieldProps<T extends PrimitiveValueType> =
  HTMLAttributes<HTMLDivElement> & {
    options: Option<T>[];
    label?: string;
    className?: string;
    disabled?: boolean;
    orientation?: "horizontal" | "vertical";
    field: { state: { value: T[] } };
  };

export function CheckboxGroupField<T extends PrimitiveValueType>(
  props: CheckboxGroupFieldProps<T>,
) {
  const field = useFieldContext<T[]>();

  return (
    <FormCheckboxGroup
      value={field.state.value || []}
      onChange={(value) => field.handleChange(value as T[])}
      onBlur={field.handleBlur}
      options={props.options}
      label={props.label}
      className={props.className}
      disabled={props.disabled}
      orientation={props.orientation}
    />
  );
}
