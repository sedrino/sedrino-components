import { HTMLAttributes } from "react";

import { useFieldContext } from "@/components/form-fields/form-context";
import { PrimitiveValueType } from "@/components/form/form-utils";
import { FormSwitch } from "@/components/form/switch";

type SwitchFieldProps<
  TOnValue extends PrimitiveValueType = true,
  TOffValue extends PrimitiveValueType = false,
> = HTMLAttributes<HTMLDivElement> & {
  id?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  onValue?: TOnValue;
  offValue?: TOffValue;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  field: { state: { value: TOnValue | TOffValue } };
};

export function SwitchField<
  TOnValue extends PrimitiveValueType = true,
  TOffValue extends PrimitiveValueType = false,
>(props: SwitchFieldProps<TOnValue, TOffValue>) {
  const field = useFieldContext<TOnValue | TOffValue>();
  const id = props.id ?? `${field.name}`;

  return (
    <FormSwitch
      id={id}
      value={field.state.value}
      onChange={(value) => field.handleChange(value as TOnValue | TOffValue)}
      onBlur={field.handleBlur}
      label={props.label}
      disabled={props.disabled}
      className={props.className}
      onValue={props.onValue}
      offValue={props.offValue}
      checked={props.checked}
      onCheckedChange={props.onCheckedChange}
    />
  );
}
