import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { ItineraryView } from "@/features/admin/components/ItineraryView";

export type TRating = {
  userId: string;
  userName: string;
  rating: number;
  review?: string;
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
  appropriate: boolean;
};

function calculateAverageRating(ratings: TRating[]): number {
  if (ratings.length === 0) {
    return 0;
  }

  const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
  return totalRating / ratings.length;
}

export const itinerariesColumns= (
  onSubmit: (itinerary: TItinerary) => void,
):ColumnDef<TItinerary>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div className="font-medium">${row.original.price}</div>,
    meta: {
      className: "hidden sm:table-cell",
    },
  },
  {
    accessorKey: "ratings",
    header: "Rating",
    cell: ({ row }) => (
      <div className="capitalize text-sm">
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {calculateAverageRating(row.original.ratings).toFixed(1)} ⭐
        </span>
      </div>
    ),
    meta: {
      className: "hidden md:table-cell",
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          row.original.appropriate 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {row.original.appropriate ? "Appropriate" : "Inappropriate"}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="text-right">
        <ItineraryView
          itineraryData={row.original}
          dialogTrigger={
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">View Details</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          }
          onSubmit={onSubmit}
        />
      </div>
    ),
  },
];
