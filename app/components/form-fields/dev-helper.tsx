import { useState } from "react";
import { Code } from "lucide-react";

import { useFormContext } from "@/components/form-fields/form-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function DevHelper() {
  const form = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="fixed bottom-4 right-4 z-50 w-80 overflow-hidden rounded-lg border border-slate-700 bg-slate-900 text-white shadow-lg"
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex w-full items-center justify-between p-2 text-xs hover:bg-slate-800"
        >
          <div className="flex items-center gap-2">
            <Code size={14} />
            <span>Form Dev Tools</span>
          </div>
          <form.Subscribe
            selector={(state) => ({
              isValid: state.isValid,
              isDirty: state.isDirty,
              isSubmitting: state.isSubmitting,
            })}
          >
            {(value) => (
              <div className="flex gap-1">
                <Badge
                  variant={value.isValid ? "default" : "destructive"}
                  className="h-4 px-1 py-0 text-[10px]"
                >
                  {value.isValid ? "valid" : "invalid"}
                </Badge>
                {value.isDirty && (
                  <Badge
                    variant="secondary"
                    className="h-4 px-1 py-0 text-[10px]"
                  >
                    dirty
                  </Badge>
                )}
                {value.isSubmitting && (
                  <Badge
                    variant="outline"
                    className="h-4 animate-pulse px-1 py-0 text-[10px]"
                  >
                    submitting
                  </Badge>
                )}
              </div>
            )}
          </form.Subscribe>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="max-h-96 overflow-auto p-2 text-xs">
          <form.Subscribe
            selector={(state) => ({
              errors: state.errors,
              errorMap: state.errorMap,
              isValid: state.isValid,
              canSubmit: state.canSubmit,
              isDirty: state.isDirty,
              isPristine: state.isPristine,
              isTouched: state.isTouched,
              isSubmitted: state.isSubmitted,
              isSubmitSuccessful: state.isSubmitSuccessful,
              isSubmitting: state.isSubmitting,
            })}
          >
            {(value) => (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-1">
                  <div className="font-semibold">Status</div>
                  <div className="flex flex-wrap gap-1">
                    <Badge
                      variant={value.isValid ? "default" : "destructive"}
                      className="text-[10px]"
                    >
                      {value.isValid ? "Valid" : "Invalid"}
                    </Badge>
                    {value.isDirty && (
                      <Badge variant="secondary" className="text-[10px]">
                        Dirty
                      </Badge>
                    )}
                    {value.isPristine && (
                      <Badge variant="secondary" className="text-[10px]">
                        Pristine
                      </Badge>
                    )}
                    {value.isTouched && (
                      <Badge variant="secondary" className="text-[10px]">
                        Touched
                      </Badge>
                    )}
                    {value.isSubmitted && (
                      <Badge variant="secondary" className="text-[10px]">
                        Submitted
                      </Badge>
                    )}
                    {value.isSubmitSuccessful && (
                      <Badge variant="default" className="text-[10px]">
                        Submit Success
                      </Badge>
                    )}
                    {value.isSubmitting && (
                      <Badge
                        variant="outline"
                        className="animate-pulse text-[10px]"
                      >
                        Submitting
                      </Badge>
                    )}
                    {value.canSubmit && (
                      <Badge variant="default" className="text-[10px]">
                        Can Submit
                      </Badge>
                    )}
                  </div>
                </div>

                {Object.keys(value.errorMap).length > 0 && (
                  <div className="space-y-2">
                    <div className="font-semibold text-destructive">
                      Errors:
                    </div>
                    {Object.entries(value.errorMap).map(
                      ([eventType, fieldErrors]) => (
                        <div
                          key={eventType}
                          className="rounded border border-destructive/30 bg-destructive/10 p-2"
                        >
                          <div className="font-medium">{eventType}:</div>
                          {fieldErrors &&
                            Object.entries(fieldErrors || {}).map(
                              ([fieldName, errors]) => (
                                <div
                                  key={fieldName}
                                  className="mt-2 border-t border-destructive/20 pt-2"
                                >
                                  <div className="text-xs font-medium">
                                    Field: {fieldName}
                                  </div>
                                  <div className="text-[10px] text-destructive">
                                    {/* @ts-ignore */}
                                    {typeof errors === "string" ? (
                                      errors
                                    ) : // @ts-ignore
                                    errors?.message ? (
                                      // @ts-ignore
                                      errors.message
                                    ) : Array.isArray(errors) ? (
                                      <ul className="list-disc pl-4">
                                        {errors.map((err, i) => (
                                          <li key={i}>
                                            {err.message ||
                                              `${err.code}: Expected ${err.expected}, received ${err.received}${err.path ? ` at ${err.path.join(".")}` : ""}`}
                                          </li>
                                        ))}
                                      </ul>
                                    ) : (
                                      JSON.stringify(errors)
                                    )}
                                  </div>
                                </div>
                              ),
                            )}
                        </div>
                      ),
                    )}
                  </div>
                )}

                <div className="pt-2">
                  <details>
                    <summary className="cursor-pointer text-[11px] text-slate-400">
                      Raw Form Data
                    </summary>
                    <pre className="mt-2 whitespace-pre-wrap break-words text-[10px] text-slate-300">
                      {JSON.stringify(value, null, 2)}
                    </pre>
                  </details>
                </div>
              </div>
            )}
          </form.Subscribe>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
