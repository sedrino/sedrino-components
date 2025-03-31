import { HTMLAttributes, useEffect, useState } from "react";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export type FormSliderProps = Omit<
  React.ComponentPropsWithoutRef<typeof Slider>,
  "value" | "onValueChange" | "onChange"
> & {
  value: number | number[];
  onChange: (value: number | number[]) => void;
  onBlur?: () => void;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  showValue?: boolean;
  valueSuffix?: string;
};

export function FormSlider(props: FormSliderProps) {
  const [sliderValue, setSliderValue] = useState<number[]>([]);

  const {
    value,
    onChange,
    onBlur,
    min = 0,
    max = 100,
    step = 1,
    showValue = false,
    valueSuffix = "",
    label,
    disabled,
    className,
    ...sliderProps
  } = props;

  // Keep the UI display in sync with the value
  useEffect(() => {
    if (Array.isArray(value)) {
      setSliderValue(value);
    } else if (typeof value === "number") {
      setSliderValue([value]);
    } else {
      setSliderValue([min]);
    }
  }, [value, min]);

  const handleValueChange = (newValue: number[]) => {
    // If the original field expects an array, pass the array
    // If it expects a single number, pass just the first value
    if (Array.isArray(value)) {
      onChange(newValue);
    } else {
      onChange(newValue[0]);
    }
  };

  const getDisplayValue = () => {
    if (sliderValue.length === 1) {
      return `${sliderValue[0]}${valueSuffix}`;
    }
    return sliderValue.map((v) => `${v}${valueSuffix}`).join(" - ");
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        {label && (
          <label className="text-sm font-medium leading-none">{label}</label>
        )}
        {showValue && (
          <span className="text-sm text-muted-foreground">
            {getDisplayValue()}
          </span>
        )}
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onValueChange={handleValueChange}
        onValueCommit={onBlur}
        disabled={disabled}
        {...sliderProps}
      />
    </div>
  );
}
