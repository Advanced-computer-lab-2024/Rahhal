import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ChevronRight } from "lucide-react";
import { ActivitiesModal } from "@/components/non-tourist/advertiser/ActivityModal";
import { Badge } from "@/components/ui/badge";
import { FaTrash } from "react-icons/fa6";
import { deleteActivity } from "@/api-calls/activities-api-calls";

export type TRating = {
  user: string;
  rating: number;
  review?: string;
};

export type TCategory = {
  _id: string;
  name: string;
};

export type TActivity = {
  _id?: string;
  name: string;
  description: string;
  time: Date;
  date: Date;
  location: { longitude: number; latitude: number };
  specialDiscount: number;
  preferenceTags: { _id: string; name: string }[];
  isBookingOpen: boolean;
  price: Record<string, number>;
  category: { _id: string; name: string };
  tags: { _id: string; name: string }[];
  ratings: TRating[];
  owner: string;
};
// Derive TNewActivity from TActivity
export type TNewActivity = Omit<TActivity, "preferenceTags" | "category" | "tags" | "_id"> & {
  // Each representing the id(s) of the omitted fields so that they can directly be inserted in the db
  preferenceTags: string[];
  category: string;
  tags: string[];
};

function deleteRow(row: any) {
  deleteActivity(row.original);
}

function displayMinMaxPrice(price: Record<string, number>) {
  const prices = Object.values(price);
  if (prices.length === 0) {
    return 0;
  }
  
  let minPrice = Math.min(...prices);
  let maxPrice = Math.max(...prices);
  if (minPrice === maxPrice) {
    return minPrice;
  } else {
    return `${minPrice} - ${maxPrice}`;
  }
}

function calculateAverageRating(ratings: TRating[]) {

  if (ratings.length === 0) {
    return 0;
  }

  const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
  return totalRating / ratings.length;
}

export const activitiesColumns: ColumnDef<TActivity>[] = [
  {
    accessorKey: "name",
    header: "name",
    cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
  },
  {
    accessorKey: "category",
    header: "category",
    cell: ({ row }) => <div className="capitalize">{row.original.category.name}</div>,
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
    cell: ({ row }) => <div className="capitalize">{typeof row.original.price == "object" ? displayMinMaxPrice(row.original.price) : row.original.price}</div>,
  },
  {
    accessorKey: "tags",
    header: "tags",
    cell: ({ row }) => (
      <div>
        {row.original.preferenceTags.map((preferenceTag) => (
          <Badge key={preferenceTag._id} variant="default" className="mr-1">
            {preferenceTag.name}
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
          Average Rating
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
