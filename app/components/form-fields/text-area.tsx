import { useFieldContext } from "@/components/form-fields/form-context";
import { FormTextArea } from "@/components/form/text-area";

type TextAreaFieldProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  id?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  rows?: number;
  placeholder?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  field: { state: { value?: string | null } };
};

export function TextAreaField(props: TextAreaFieldProps) {
  const field = useFieldContext<string>();
  const id = props.id ?? `${field.name}`;

  return (
    <FormTextArea
      id={id}
      value={field.state.value || ""}
      onChange={(value) => field.handleChange(value)}
      onBlur={field.handleBlur}
      disabled={props.disabled}
      autoFocus={props.autoFocus}
      rows={props.rows}
      placeholder={props.placeholder}
      onKeyDown={props.onKeyDown}
      className={props.className}
    />
  );
}
