import { Block } from "@tanstack/react-router";

// TESTING

import { useFormContext } from "@/components/form-fields/form-context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Blocker() {
  const form = useFormContext();
  return (
    <form.Subscribe
      selector={(state) => ({
        isDirty: state.isDirty,
        isSubmitted: state.isSubmitted,
      })}
    >
      {({ isDirty, isSubmitted }) => (
        <>
          <Block
            shouldBlockFn={() => isDirty}
            withResolver
            enableBeforeUnload={false}
          >
            {({ status, proceed, reset }) => (
              <>
                {status === "blocked" && (
                  <Dialog
                    open={status === "blocked"}
                    onOpenChange={() => reset()}
                  >
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Unsaved Changes</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <p>
                          Are you sure you want to leave? Your changes will be
                          lost.
                        </p>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={reset}>
                          No, stay
                        </Button>
                        <Button onClick={proceed}>Yes, leave</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </>
            )}
          </Block>
        </>
      )}
    </form.Subscribe>
  );
}
