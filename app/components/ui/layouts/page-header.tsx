export const PageHeader = (props: { children?: React.ReactNode }) => {
  return (
    <div className="border-default flex h-12 max-h-12 min-h-12 items-center border-b px-6">
      {props.children}
    </div>
  );
};
