import * as React from "react";
import { Link, LinkProps, Outlet } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

// forward ref of a div
const LinkTabsRoot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("", className)} {...props} />;
});
const LinkTabsList = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
});
function LinkTabsTrigger({
  className,
  ...props
}: LinkProps & {
  className?: string;
}) {
  return (
    <Link
      {...props}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[status=active]:bg-background data-[status=active]:text-foreground data-[status=active]:shadow-sm",
        className,
      )}
    />
  );
}
const LinkTabsOutlet = () => {
  return (
    <div className="mt-2">
      <Outlet />
    </div>
  );
};
export const LinkTabs = {
  Root: LinkTabsRoot,
  List: LinkTabsList,
  Trigger: LinkTabsTrigger,
  Outlet: LinkTabsOutlet,
};
