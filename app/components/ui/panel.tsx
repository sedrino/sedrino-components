import { cn } from "@/lib/utils";

export function Panel(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-default overflow-hidden rounded-md border bg-surface-100 shadow",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
Panel.Divider = function PanelDivider() {
  return <div className="border-b border-border" />;
};
