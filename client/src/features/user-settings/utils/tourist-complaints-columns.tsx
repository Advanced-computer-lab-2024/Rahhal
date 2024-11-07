import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { TouristComplaintsModal } from "../components/TouristComplaintsModal";
import { ArrowUpDown } from "lucide-react";

export type TComplaint = {
  _id?: string;
  title: string;
  body: string;
  status?: string;
  date: Date;
  owner: string;
  replies: string[];
};

export const touristComplaintsColumns: ColumnDef<TComplaint>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div className="capitalize">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formattedDate = date.toLocaleDateString("en-GB");
      return <div className="capitalize">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <TouristComplaintsModal
            complaintData={row.original}
            dialogTrigger={
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">View Details</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            }
            id={row.original.owner}
          />
        </div>
      );
    },
  },
];