import { useFieldContext } from "@/components/form-fields/form-context";
import { FormSlider } from "@/components/form/slider";

type SliderFieldProps<T extends number | number[]> = Omit<
  React.ComponentPropsWithoutRef<typeof FormSlider>,
  "value" | "onChange"
> & {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  showValue?: boolean;
  valueSuffix?: string;
  field: { state: { value: T } };
};

export function SliderField<T extends number | number[]>(
  props: SliderFieldProps<T>,
) {
  const field = useFieldContext<number | number[]>();

  return (
    <FormSlider
      value={field.state.value}
      onChange={(value: number | number[]) => field.handleChange(value)}
      onBlur={field.handleBlur}
      min={props.min}
      max={props.max}
      step={props.step}
      label={props.label}
      disabled={props.disabled}
      className={props.className}
      showValue={props.showValue}
      valueSuffix={props.valueSuffix}
    />
  );
}
