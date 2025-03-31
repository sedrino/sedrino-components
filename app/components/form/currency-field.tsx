import { HTMLAttributes, useEffect, useState } from "react";
import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";
import { cn } from "@/lib/utils";

export type FormCurrencyFieldProps = Omit<CurrencyInputProps, "value" | "onValueChange"> & {
  value: number | string | null;
  onChange: (value: number | string | null) => void;
  onBlur?: () => void;
  label?: string;
  id?: string;
  className?: string;
  currency?: string;
  locale?: string;
  allowNegative?: boolean;
  placeholder?: string;
  disabled?: boolean;
};

export function FormCurrencyField(props: FormCurrencyFieldProps) {
  const [displayValue, setValue] = useState<string>("");
  
  const {
    value,
    onChange,
    onBlur,
    id,
    currency = "USD",
    locale = "en-US",
    allowNegative = false,
    placeholder = "0.00",
    disabled,
    className,
    ...inputProps
  } = props;

  // Keep the UI display in sync with the value
  useEffect(() => {
    if (value === null || value === undefined) {
      setValue("");
    } else {
      setValue(String(value));
    }
  }, [value]);

  const handleValueChange = (newValue: string | undefined) => {
    if (newValue === undefined || newValue === "") {
      onChange(null);
      return;
    }
    
    // Store as string with all formatting for display purposes
    // You can convert to number when using the value elsewhere if needed
    onChange(newValue);
  };

  return (
    <CurrencyInput
      id={id}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      value={displayValue}
      onValueChange={handleValueChange}
      onBlur={onBlur}
      prefix={currency === "USD" ? "$ " : ""}
      suffix={currency === "EUR" ? " €" : ""}
      groupSeparator={locale.startsWith("en") ? "," : "."}
      decimalSeparator={locale.startsWith("en") ? "." : ","}
      allowNegativeValue={allowNegative}
      placeholder={placeholder}
      disabled={disabled}
      {...inputProps}
    />
  );
}