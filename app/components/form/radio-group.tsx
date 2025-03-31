import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Label } from "../ui/label";
import { PrimitiveValueType, stringToValue, valueToString } from "./form-utils";

export type FormRadioGroupProps<TValue extends PrimitiveValueType> = {
  value: TValue;
  onChange: (value: TValue) => void;
  className?: string;
  defaultValue?: TValue;
} & React.PropsWithChildren<{}>;

export function FormRadioGroup<TValue extends PrimitiveValueType>(
  props: FormRadioGroupProps<TValue>,
) {
  const { value, onChange, className, defaultValue, children } = props;

  // Create a mechanism to map non-string values to string for RadioGroup
  const defaultValueString =
    defaultValue !== undefined ? valueToString(defaultValue) : undefined;

  return (
    <RadioGroup
      defaultValue={defaultValueString}
      value={valueToString(value)}
      onValueChange={(stringValue) =>
        onChange(stringToValue(stringValue) as TValue)
      }
      className={className}
    >
      {children}
    </RadioGroup>
  );
}

export type FormRadioGroupItemProps<TValue extends PrimitiveValueType> = {
  /**
   * The value of this radio button.
   */
  value: TValue;
  label: string;
  className?: string;
};

export function FormRadioGroupItem<TValue extends PrimitiveValueType>(
  props: FormRadioGroupItemProps<TValue>,
) {
  const { value, label, className } = props;

  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={valueToString(value)} className={className} />
      <Label>{label}</Label>
    </div>
  );
}
