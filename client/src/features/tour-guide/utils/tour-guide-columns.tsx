import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ChevronRight } from "lucide-react";
import { ItinerariesModal } from "@/features/tour-guide/components/ItineraryModal";
import { Badge } from "@/components/ui/badge";
import type { TRating } from "@/types/shared";

export type TCategory = {
  _id: string;
  name: string;
};

export type TItinerary = {
  _id?: string;
  name: string;
  images: string[];
  description: string;
  activities: string[];
  locations: { longitude: number; latitude: number }[];
  timeline: string;
  durationOfActivities: string[];
  languages: string[];
  price: number;
  availableDatesTime: { Date: Date; Time: Date }[];
  accessibility: string;
  pickUpLocation: { longitude: number; latitude: number; placeId: string };
  dropOffLocation: { longitude: number; latitude: number; placeId: string };
  ratings: TRating[];
  preferenceTags: { _id: string; name: string }[];
  category: { _id: string; name: string };
  active: boolean;
  owner: string;
  ownerName: string;
};

export type TNewItinerary = Omit<TItinerary, "preferenceTags" | "category" | "_id"> & {
  // Each representing the id(s) of the omitted fields so that they can directly be inserted in the db
  preferenceTags: string[];
  category: string;
};


function calculateAverageRating(ratings: TRating[]) {
  const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
  return totalRating / ratings.length;
}

export const itinerariesColumns: ColumnDef<TItinerary>[] = [
  {
    accessorKey: "name",
    header: "name",
    cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
  },
  {
    accessorKey: "status",
    header: "status",
    cell: ({ row }) => (
      <div>
        {row.original.active ? (
          <span className="text-muted-foreground">Active</span>
        ) : (
          <span className="text-muted-foreground">Inactive</span>
        )}
      </div>
    ),
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
    cell: ({ row }) => <div className="capitalize">{row.original.price}</div>,
  },
  {
    accessorKey: "preferenceTags",
    header: "preferenceTags",
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
          
          
          <ItinerariesModal
            itineraryData={row.original}
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
