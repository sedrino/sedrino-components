import { useFieldContext } from "@/components/form-fields/form-context";
import { cn } from "@/lib/utils";

export function ValidationError(props: {
  className?: string;
  maxToShow?: number | "all";
}) {
  const field = useFieldContext();
  const errors = field.state.meta.errors || [];

  // Determine how many errors to show
  const errorsToShow =
    props.maxToShow === "all" || !props.maxToShow
      ? errors
      : errors.slice(0, props.maxToShow);

  return (
    <div className={cn("text-xs text-red-500", props.className)}>
      {errorsToShow.length > 0
        ? errorsToShow.map((error, index) => (
            <div key={index}>
              {typeof error === "string"
                ? error
                : error.message || JSON.stringify(error)}
            </div>
          ))
        : null}
      {props.maxToShow !== "all" &&
        props.maxToShow &&
        errors.length > props.maxToShow && (
          <div>And {errors.length - props.maxToShow} more error(s)</div>
        )}
    </div>
  );
}
