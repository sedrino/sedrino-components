import type { CurrencyInputProps } from "react-currency-input-field";

import { useFieldContext } from "@/components/form-fields/form-context";
import { FormCurrencyField } from "@/components/form/currency-field";

type CurrencyFieldProps = Omit<
  CurrencyInputProps,
  "value" | "onValueChange"
> & {
  label?: string;
  id?: string;
  className?: string;
  currency?: string;
  locale?: string;
  allowNegative?: boolean;
  placeholder?: string;
  disabled?: boolean;
  field: { state: { value: number | string | null } };
};

export function CurrencyField(props: CurrencyFieldProps) {
  const field = useFieldContext<number | string | null>();
  const id = props.id ?? `${field.name}`;

  return (
    <FormCurrencyField
      id={id}
      value={field.state.value}
      onChange={(value) => field.handleChange(value)}
      onBlur={field.handleBlur}
      currency={props.currency}
      locale={props.locale}
      allowNegative={props.allowNegative}
      placeholder={props.placeholder}
      disabled={props.disabled}
      className={props.className}
    />
  );
}
