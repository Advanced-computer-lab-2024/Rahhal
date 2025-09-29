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
import { useEffect } from "react";
import { GenericSelect } from "@/components/GenericSelect";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  newRowModal?: React.ReactNode;
  enableFilters?: boolean;
  complaintFilter?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  newRowModal,
  enableFilters = false,
  complaintFilter = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
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

  useEffect(() => {
    if (enableFilters) {
      try {
        if (priceRange.min !== "" || priceRange.max !== "") {
          table.getColumn("price")?.setFilterValue((old: any) => ({
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
    }
  }, [priceRange, table]);

  // Hide all columns except the first two on mobile view
  // (which should be the most two important columns)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        table.getAllColumns().forEach((col, idx) => {
          if (idx > 1) {
            col.toggleVisibility(false);
          }
        });
      } else {
        table.getAllColumns().forEach((col) => {
          col.toggleVisibility(true);
        });
      }
    };

    handleResize(); // Run on mount

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [table]);

  return (
    <div className="w-full">
      <div className="flex flex-row-reverse justify-start flex-wrap gap-4 items-center">
        <div className="flex items-start sm:items-center py-4 gap-2 sm:gap-4">
          <DataTableViewOptions table={table} />
          {newRowModal}
        </div>
        {enableFilters && (
          <div className="flex gap-x-2 py-4">
            <Input
              placeholder="Filter names..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <Input
              placeholder="Min price"
              type="number"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange((prev) => ({ ...prev, min: e.target.value }))
              }
              className="max-w-[100px]"
            />
            <Input
              placeholder="Max price"
              type="number"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange((prev) => ({ ...prev, max: e.target.value }))
              }
              className="max-w-[100px]"
            />
          </div>
        )}
        {complaintFilter && (
          <GenericSelect
            width="w-1/4"
            label="Status"
            options={[
              { value: "all", label: "Select a status" },
              { value: "resolved", label: "Resolved" },
              { value: "pending", label: "Pending" },
            ]}
            initialValue={undefined}
            placeholder={"Select a status"}
            onSelect={(value) => {
              if (value === "all") {
                table.getColumn("status")?.setFilterValue(undefined);
              } else {
                table.getColumn("status")?.setFilterValue(value);
              }
            }}
          />
        )}
      </div>
      <div className="rounded-md overflow-x-auto">
        <Table className="border-separate border-spacing-y-2 min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-transparent border-none"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
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
                        "rounded-tr-xl rounded-br-xl":
                          index === row.getVisibleCells().length - 1,
                        "rounded-tl-xl rounded-bl-xl": index === 0,
                      })}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
