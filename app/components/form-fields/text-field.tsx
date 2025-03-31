import { useFieldContext } from "@/components/form-fields/form-context";
import { FormTextField } from "@/components/form/text-field";

type TextFieldBaseProps<T> = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  id?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  mask?: string; // Optional mask pattern (e.g., "___-___-___")
  maskChar?: string; // Optional mask character (default: "_")
  field: { state: { value: T } };
};

type StandardTextFieldProps = TextFieldBaseProps<string> & {
  type?: "text" | "email" | "password" | "tel" | "url" | "search";
};

type NumberTextFieldProps = TextFieldBaseProps<number> & {
  type: "number";
};

type TextNumberFieldProps = TextFieldBaseProps<number | null> & {
  type: "text-number";
};

type TextFieldProps =
  | StandardTextFieldProps
  | NumberTextFieldProps
  | TextNumberFieldProps;

export function TextField(props: TextFieldProps) {
  const field = useFieldContext<string | number | null>();
  const id = props.id ?? `${field.name}`;

  return (
    <FormTextField
      id={id}
      value={field.state.value}
      onChange={(value) => field.handleChange(value)}
      onBlur={field.handleBlur}
      disabled={props.disabled}
      autoFocus={props.autoFocus}
      type={props.type as any}
      mask={props.mask}
      maskChar={props.maskChar}
      onKeyDown={props.onKeyDown}
      className={props.className}
    />
  );
}
