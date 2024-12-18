import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ChevronRight } from "lucide-react";
import { ActivitiesModal } from "@/features/advertiser/components/ActivityModal";
import { Badge } from "@/components/ui/badge";
import type { TRating } from "@/types/shared";

export type TCategory = {
  _id: string;
  name: string;
};

export type TActivity = {
  _id?: string;
  name: string;
  description: string;
  time: Date;
  images: string[];
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
  ownerName: string;
  isAppropriate: boolean;
};

// Derive TNewActivity from TActivity
export type TNewActivity = Omit<TActivity, "preferenceTags" | "category" | "tags" | "_id"> & {
  // Each representing the id(s) of the omitted fields so that they can directly be inserted in the db
  preferenceTags: string[];
  category: string;
  tags: string[];
};

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

export const activitiesColumns= (
  onDelete: (id: string) => void,
  onSubmit: (activity: TActivity) => void,
): ColumnDef<TActivity>[] => [
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
    cell: ({ row }) => (
      <div className="capitalize">
        {typeof row.original.price == "object"
          ? displayMinMaxPrice(row.original.price)
          : row.original.price}
      </div>
    ),
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
          <ActivitiesModal
            activityData={row.original}
            dialogTrigger={
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            }
            onDelete={(id) => onDelete(id)}
            onSubmit={(activity) => onSubmit(activity)}
          />
        </div>
      );
    },
  },
];
