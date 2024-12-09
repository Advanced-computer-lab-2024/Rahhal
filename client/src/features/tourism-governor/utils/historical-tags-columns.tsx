import { ColumnDef } from "@tanstack/react-table";

export type THistoricalTag = {
  _id: string;
  name: string;
};

export const historicalTagsColumns= (
): ColumnDef<THistoricalTag>[] => [
  {
    accessorKey: "name",
    header: "Historical Tag Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
];
