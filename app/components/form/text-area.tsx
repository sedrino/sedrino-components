import { useEffect, useState } from "react";

import { Textarea } from "@/components/ui/textarea";

export type FormTextAreaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "value" | "onChange"
> & {
  value?: string | null;
  onChange: (value: string) => void;
  onBlur?: () => void;
  className?: string;
  id?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  rows?: number;
  placeholder?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

export function FormTextArea(props: FormTextAreaProps) {
  const {
    value,
    onChange,
    onBlur,
    id,
    disabled,
    autoFocus,
    rows,
    placeholder,
    onKeyDown,
    className,
    ...restProps
  } = props;

  const [displayValue, setDisplayValue] = useState<string>("");

  /**
   * Keep the UI display in sync with the value if something else (like a form reset)
   * changes the value externally.
   */
  useEffect(() => {
    if (value === null || value === undefined) {
      setDisplayValue("");
      return;
    }
    setDisplayValue(String(value));
  }, [value]);

  /**
   * Handle user changes to the textarea
   */
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const typedValue = e.target.value;
    onChange(typedValue);
  };

  return (
    <Textarea
      id={id}
      value={displayValue}
      onChange={handleChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      disabled={disabled}
      autoFocus={autoFocus}
      rows={rows}
      placeholder={placeholder}
      className={className}
      {...restProps}
    />
  );
}
