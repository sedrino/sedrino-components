import { HTMLAttributes, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export type FormCheckboxProps = HTMLAttributes<HTMLDivElement> & {
  value: boolean;
  onChange: (value: boolean) => void;
  onBlur?: () => void;
  id?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
};

export function FormCheckbox(props: FormCheckboxProps) {
  const { value, onChange, onBlur, id, label, disabled, className, ...restProps } = props;
  const [checked, setChecked] = useState<boolean>(false);

  // Keep the UI display in sync with the value
  useEffect(() => {
    setChecked(!!value);
  }, [value]);

  const handleCheckedChange = (checked: boolean) => {
    onChange(checked);
  };

  return (
    <div className={cn("flex items-center space-x-2", className)} {...restProps}>
      <Checkbox 
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