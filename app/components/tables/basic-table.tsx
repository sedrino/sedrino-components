import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function BasicTable<TData>(props: {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  caption?: string;
}) {
  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Table>
      {props.caption && <TableCaption>{props.caption}</TableCaption>}
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                className={
                  header.column.id === "amount"
                    ? "text-right"
                    : header.column.id === "invoice"
                      ? "w-[100px]"
                      : ""
                }
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
export function BasicTableWithPagination<TData>(props: {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  caption?: string;
  page: number;
  pageSize: number;
  onPageChange?: (page: number) => void;
}) {
  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    pageCount: Math.ceil(props.data.length / props.pageSize),
    state: {
      pagination: {
        pageIndex: props.page - 1,
        pageSize: props.pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div>
      <Table>
        {props.caption && <TableCaption>{props.caption}</TableCaption>}
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={
                    header.column.id === "amount"
                      ? "text-right"
                      : header.column.id === "invoice"
                        ? "w-[100px]"
                        : ""
                  }
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-row justify-between">
        <Pagination className="justify-start">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => table.previousPage()}
                aria-disabled={!table.getCanPreviousPage()}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                search={{
                  page: props.page + 1,
                }}
              >
                {props.page + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => table.nextPage()}
                aria-disabled={!table.getCanNextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
