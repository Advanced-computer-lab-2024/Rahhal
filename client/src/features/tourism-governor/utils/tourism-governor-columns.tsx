import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { HistoricalPlacesModal } from "../components/HistoricalPlacesModal";
import type { TRating } from "@/types/shared";

export type TCategory = {
  _id: string;
  name: string;
};

export type THistoricalPlace = {
  _id: string;
  name: string;
  description: string;
  location: { longitude: number; latitude: number; placeId?: string };
  openingHours: { open: Date; close: Date };
  price: Record<string, number>;
  images: string[];
  preferenceTags: { _id: string; name: string }[];
  owner: string;
  category: { _id: string; name: string };
  tags: { _id: string; name: string }[];
  ratings: TRating[];
};

// Derive TNewHistoricalPlace from THistoricalPlace
export type TNewHistoricalPlace = Omit<
  THistoricalPlace,
  "preferenceTags" | "category" | "tags" | "_id"
> & {
  // Each representing the id(s) of the omitted fields so that they can directly be inserted in the db
  preferenceTags: string[];
  category: string;
  tags: string[];
};

function calculateAverageRating(ratings: TRating[]) {
  const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
  return totalRating / ratings.length;
}

export const historicalPlacesColumns= (
  onDelete: (id: string) => void,
  onSubmit: (historicalPlace: THistoricalPlace) => void,
): ColumnDef<THistoricalPlace>[] => [
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
    accessorKey: "tags",
    header: "tags",
    cell: ({ row }) => (
      <div>
        {row.original.tags.map((tag) => (
          <Badge key={tag._id} variant="default" className="mr-1">
            {tag.name}
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
      <div className="capitalize">{calculateAverageRating(row.original.ratings)}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <HistoricalPlacesModal
            historicalPlaceData={row.original}
            dialogTrigger={
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            }
            onDelete={(id) => onDelete(id)}
            onSubmit={(historicalPlace) => onSubmit(historicalPlace)}
          />
        </div>
      );
    },
  },
];
