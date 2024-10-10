import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ColumnDef } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { DataTableViewOptions } from "./DataTableViewOptions";
import { DataTablePagination } from "./DataTablePagination";
import { Input } from "@/components/ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  newRowModal?: React.ReactNode;
  enableFilters?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  newRowModal,
  enableFilters = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [priceRange, setPriceRange] = React.useState({ min: "", max: "" });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  React.useEffect(() => {
    try {
      if (priceRange.min !== "" || priceRange.max !== "") {
        table.getColumn("price")?.setFilterValue((old) => ({
          ...old,
          min: priceRange.min,
          max: priceRange.max,
        }));
      } else {
        table.getColumn("price")?.setFilterValue(undefined);
      }
    } catch (e) {
      console.log(e);
    }
  }, [priceRange, table]);

  return (
    <div className="container m-auto">
      <div className="flex items-center py-4">
        <DataTableViewOptions table={table} />
        {newRowModal}
      </div>
      {enableFilters && (
        <div className="flex space-x-2 py-4">
          <Input
            placeholder="Filter names..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <div className="flex space-x-2">
            <Input
              placeholder="Min price"
              type="number"
              value={priceRange.min}
              onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
              className="max-w-[100px]"
            />
            <Input
              placeholder="Max price"
              type="number"
              value={priceRange.max}
              onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
              className="max-w-[100px]"
            />
          </div>
        </div>
      )}
      <div className="rounded-md">
        <Table className="border-separate border-spacing-y-2">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-none">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-none">
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      // Apply rounded corners to the first and last cell in the row as a workaround since border-radius does not apply on <tr> elements
                      className={cn({
                        "rounded-tr-xl rounded-br-xl": index === row.getVisibleCells().length - 1,
                        "rounded-tl-xl rounded-bl-xl": index === 0,
                      })}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>{" "}
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
