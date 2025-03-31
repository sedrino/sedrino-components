import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

export function Grid() {
  return (
    <div className="grid grid-cols-12 gap-6 px-8 py-8 opacity-100">
      <div className="col-span-12 text-sm text-foreground lg:col-span-5">
        <label>Label</label>
      </div>
      <div className="col-span-12 lg:col-span-7"></div>
    </div>
  );
}
export function TwoColumn(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-12 gap-6 @container", props.className)}>
      {props.children}
    </div>
  );
}
TwoColumn.Left = function TwoColumnLeft(props: { children: React.ReactNode }) {
  return <div className="col-span-12 @lg:col-span-5">{props.children}</div>;
};
TwoColumn.Right = function TwoColumnRight(props: {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}) {
  const { asChild } = props;
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn(
        "relative col-span-12 flex flex-col gap-6 @lg:col-span-7",
        props.className,
      )}
    >
      {props.children}
    </Comp>
  );
};
export function InputContainer(props: {
  label: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 text-sm leading-4 md:grid md:grid-cols-12">
      <div className="col-span-12 flex flex-row justify-between space-x-2">
        {props.label}
      </div>
      <div className="col-span-12">
        <div className="">
          <div className="relative">{props.children}</div>
        </div>
        <p
          data-state="hide"
          className="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm leading-4 text-red-900 transition-all"
        ></p>
      </div>
    </div>
  );
}
InputContainer.Label = function InputContainerLabel(props: {
  children: React.ReactNode;
}) {
  return (
    <label className="text-foreground-light block text-sm leading-4">
      {props.children}
    </label>
  );
};
