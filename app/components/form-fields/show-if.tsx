import { useEffect, useRef } from "react";

import { useFormContext } from "@/components/form-fields/form-context";

export function ShowIf<T, TSelected>({
  children,
  selector,
  when,
  onShow,
  onHide,
}: {
  children: React.ReactNode;
  selector: (state: T) => TSelected;
  when: (state: TSelected) => boolean;
  form?: { state: T };
  onShow?: () => void;
  onHide?: () => void;
}) {
  const form = useFormContext();
  const prevShownRef = useRef<boolean | null>(null);

  return (
    <form.Subscribe selector={selector}>
      {(value) => {
        const shouldShow = when(value);

        // Using useEffect inside the render function to handle the callbacks
        useEffect(() => {
          // Only trigger callbacks after initial render and when state changes
          if (
            prevShownRef.current !== null &&
            prevShownRef.current !== shouldShow
          ) {
            if (shouldShow && onShow) {
              onShow();
            } else if (!shouldShow && onHide) {
              onHide();
            }
          }
          prevShownRef.current = shouldShow;
        }, [shouldShow]);

        return shouldShow ? children : null;
      }}
    </form.Subscribe>
  );
}
