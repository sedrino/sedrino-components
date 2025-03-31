import { HTMLAttributes, useEffect, useState } from "react";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import { PrimitiveValueType } from "./form-utils";

export type FormSwitchProps<
  TOnValue extends PrimitiveValueType = true,
  TOffValue extends PrimitiveValueType = false,
> = HTMLAttributes<HTMLDivElement> & {
  value: TOnValue | TOffValue;
  onChange: (value: TOnValue | TOffValue) => void;
  onBlur?: () => void;
  id?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  onValue?: TOnValue;
  offValue?: TOffValue;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export function FormSwitch<
  TOnValue extends PrimitiveValueType = true,
  TOffValue extends PrimitiveValueType = false,
>(props: FormSwitchProps<TOnValue, TOffValue>) {
  const {
    value,
    onChange,
    onBlur,
    id,
    label,
    disabled,
    className,
    onValue: propOnValue,
    offValue: propOffValue,
    checked: propChecked,
    onCheckedChange,
    ...restProps
  } = props;
  const [checked, setChecked] = useState<boolean>(false);

  // Set default values for on/off if not provided
  const onValue = propOnValue !== undefined ? propOnValue : (true as TOnValue);
  const offValue =
    propOffValue !== undefined ? propOffValue : (false as TOffValue);

  // Keep the UI display in sync with the value
  useEffect(() => {
    // If propChecked is provided, use that for controlled behavior
    if (propChecked !== undefined) {
      setChecked(propChecked);
    } else {
      // Otherwise, determine checked state by comparing with onValue
      setChecked(value === onValue);
    }
  }, [value, onValue, propChecked]);

  const handleCheckedChange = (isChecked: boolean) => {
    // If onCheckedChange is provided, call that (for controlled behavior)
    if (onCheckedChange) {
      onCheckedChange(isChecked);
    } else {
      // Otherwise, update the value based on checked state
      onChange(isChecked ? onValue : offValue);
    }
  };

  return (
    <div
      className={cn("flex items-center space-x-2", className)}
      {...restProps}
    >
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={handleCheckedChange}
        disabled={disabled}
        onBlur={onBlur}
      />
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
    </div>
  );
}
