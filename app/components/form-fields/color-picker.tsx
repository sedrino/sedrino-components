import { HTMLAttributes } from "react";

import { useFieldContext } from "@/components/form-fields/form-context";
import { FormColorPicker } from "@/components/form/color-picker";

type ColorPickerFieldProps = HTMLAttributes<HTMLDivElement> & {
  id?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  defaultValue?: string;
  showColorText?: boolean;
  field: { state: { value: string } };
};

export function ColorPickerField(props: ColorPickerFieldProps) {
  const field = useFieldContext<string>();
  const id = props.id ?? `${field.name}`;

  return (
    <FormColorPicker
      id={id}
      value={field.state.value || ""}
      onChange={(value) => field.handleChange(value as string)}
      onBlur={field.handleBlur}
      label={props.label}
      disabled={props.disabled}
      className={props.className}
      defaultValue={props.defaultValue}
      showColorText={props.showColorText}
    />
  );
}
