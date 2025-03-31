import { HTMLAttributes, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type FormColorPickerProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  id?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  defaultValue?: string;
  showColorText?: boolean;
};

export function FormColorPicker(props: FormColorPickerProps) {
  const {
    value,
    onChange,
    onBlur,
    id,
    label,
    disabled,
    className,
    defaultValue,
    showColorText,
    ...restProps
  } = props;
  
  const [color, setColor] = useState<string>(defaultValue || "#000000");

  // Keep the UI display in sync with the value
  useEffect(() => {
    if (value) {
      setColor(value);
    }
  }, [value]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    onChange(newColor);
  };

  return (
    <div className={cn("space-y-2", className)} {...restProps}>
      {label && (
        <label 
          htmlFor={id}
          className="block text-sm font-medium"
        >
          {label}
        </label>
      )}
      <div className="flex items-center gap-3">
        <input
          id={id}
          type="color"
          value={color}
          onChange={handleColorChange}
          onBlur={onBlur}
          disabled={disabled}
          className="h-10 w-10 cursor-pointer rounded-md border border-input p-1"
        />
        {showColorText && (
          <div className="text-sm">{color}</div>
        )}
      </div>
    </div>
  );
}