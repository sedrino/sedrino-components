import { HTMLInputTypeAttribute, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

export type FormTextFieldBaseProps<T> = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> & {
  value: T;
  onChange: (value: T) => void;
  className?: string;
  id?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  mask?: string;
  maskChar?: string;
};

export type FormStandardTextFieldProps = FormTextFieldBaseProps<string> & {
  type?: "text" | "email" | "password" | "tel" | "url" | "search";
};

export type FormNumberTextFieldProps = FormTextFieldBaseProps<number> & {
  type: "number";
};

export type FormTextNumberFieldProps = FormTextFieldBaseProps<number | null> & {
  type: "text-number";
};

export type FormTextFieldProps =
  | FormStandardTextFieldProps
  | FormNumberTextFieldProps
  | FormTextNumberFieldProps;

export function FormTextField<T extends string | number | null>(
  props: FormTextFieldBaseProps<T> & { type?: HTMLInputTypeAttribute },
) {
  const { value, onChange, mask, maskChar = "_", ...restProps } = props;
  const [displayValue, setDisplayValue] = useState<string>("");

  const finalType: HTMLInputTypeAttribute =
    props.type === "text-number" ? "text" : props.type || "text";

  function unmaskInput(value: string): string {
    if (!mask) return value;
    const dividers = Array.from(
      new Set(mask.split("").filter((c) => c !== maskChar)),
    );
    return value
      .split("")
      .filter((char) => !dividers.includes(char))
      .join("");
  }

  function formatValue(rawValue: string): string {
    if (!mask) return rawValue;
    let formatted = "";
    let rawIndex = 0;
    for (const maskCharItem of mask) {
      if (maskCharItem === maskChar && rawIndex < rawValue.length) {
        formatted += rawValue[rawIndex++];
      } else if (maskCharItem !== maskChar && rawIndex <= rawValue.length) {
        formatted += maskCharItem;
      }
    }
    return formatted;
  }

  useEffect(() => {
    if (value === null || value === undefined) {
      setDisplayValue("");
      return;
    }
    if (typeof value === "string" && mask) {
      setDisplayValue(formatValue(value));
    } else {
      setDisplayValue(String(value));
    }
  }, [value, mask]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (mask && e.key === "Backspace" && finalType === "text") {
      const inputEl = e.currentTarget;
      const cursorPos = inputEl.selectionStart;
      if (cursorPos && cursorPos === inputEl.selectionEnd && cursorPos > 0) {
        e.preventDefault();

        let newCursorPos = cursorPos;
        while (newCursorPos > 0 && mask[newCursorPos - 1] !== maskChar) {
          newCursorPos--;
        }

        const rawValue = unmaskInput(displayValue);
        const deletionIndex =
          unmaskInput(displayValue.slice(0, newCursorPos)).length - 1;

        if (deletionIndex >= 0) {
          const updatedRawValue =
            rawValue.slice(0, deletionIndex) +
            rawValue.slice(deletionIndex + 1);
          onChange(updatedRawValue as T);
          const newDisplayValue = formatValue(updatedRawValue);
          setDisplayValue(newDisplayValue);
          setTimeout(
            () => inputEl.setSelectionRange(newCursorPos - 1, newCursorPos - 1),
            0,
          );
        }
      }
    }
    props.onKeyDown?.(e);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typedValue = e.target.value;

    if (mask && finalType === "text") {
      const raw = unmaskInput(typedValue);
      onChange(raw as T);
      setDisplayValue(formatValue(raw));
      return;
    }

    if (props.type === "number") {
      const numericValue = parseFloat(typedValue);
      if (typedValue === "" || isNaN(numericValue)) return;
      onChange(numericValue as T);
      return;
    }

    if (props.type === "text-number") {
      const numericValue = parseFloat(typedValue);
      onChange(
        (typedValue === "" || isNaN(numericValue) ? null : numericValue) as T,
      );
      return;
    }

    onChange(typedValue as T);
  };

  return (
    <Input
      {...restProps}
      type={finalType}
      value={displayValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}
