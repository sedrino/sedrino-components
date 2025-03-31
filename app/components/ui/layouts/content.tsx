import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const contentVariants = cva("flex flex-col justify-center", {
  variants: {
    position: {
      center: "mx-auto",
      left: "mr-auto",
      right: "ml-auto",
    },
    size: {
      sm: "max-w-sm px-4",
      md: "max-w-4xl px-8",
      lg: "max-w-7xl px-12",
    },
  },
  defaultVariants: {
    position: "center",
    size: "lg",
  },
});
export interface ContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contentVariants> {
  children?: React.ReactNode;
}
export const Content = ({
  children,
  position,
  size,
  className,
}: ContentProps) => {
  return (
    <div className={cn(contentVariants({ position, size }), className)}>
      {children}
    </div>
  );
};
