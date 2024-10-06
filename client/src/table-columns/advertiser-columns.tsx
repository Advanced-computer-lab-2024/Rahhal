import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ChevronRight } from "lucide-react";
import { ActivitiesModal } from "@/components/non-tourist/ActivityModal";
import { Badge } from "@/components/ui/badge";
import { FaTrash } from "react-icons/fa6";
import { deleteActivity } from "@/lib/utils";

// deleteRow function
const deleteRow = (row: any) => {
  deleteActivity(row.original);
  window.location.reload();
};

// Calculate average rating
const calculateAverageRating = (ratings: TRating[]) => {
  const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
  return totalRating / ratings.length;
};

// Rating type

export type TRating = {
  user: string;
  rating: number;
  review?: string;
};

// Category type

export type TCategory = {
  _id: string;
  name: string;
};

// Activity type

export type TActivity = {
  _id?: string;
  name: string;
  time: Date;
  date: Date;
  location: { longitude: number; latitude: number };
  specialDiscounts: string[];
  preferenceTags: { _id: string; preferenceTag: string }[];
  isBookingOpen: boolean;
  price: number | { type: string; price: number }[];
  category: { _id: string; category: string };
  tags: { _id: string; preferenceTag: string }[];
  ratings: TRating[];
};

// Columns configuration
export const activitiesColumns: ColumnDef<TActivity>[] = [
  {
    accessorKey: "name",
    header: "name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "category",
    header: "category",
    cell: ({ row }) => <div className="capitalize">{row.getValue("category")}</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("price")}</div>,
  },
  {
    accessorKey: "tags",
    header: "tags",
    cell: ({ row }) => (
      <div>
        {(row.getValue("tags") as string[]).map((tag) => (
          <Badge key={tag} variant="default" className="mr-1">
            {tag}
          </Badge>
        ))}
      </div>
    ),
  },

  {
    accessorKey: "ratings",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ratings
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{calculateAverageRating(row.getValue("ratings"))}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <Button variant="destructive" className="h-8 w-8 p-0" onClick={() => deleteRow(row)}>
            <span className="sr-only">Delete</span>
            <FaTrash className="h-4 w-4" />
          </Button>
          <ActivitiesModal
            activityData={row.original}
            dialogTrigger={
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            }
          />
        </div>
      );
    },
  },
];
