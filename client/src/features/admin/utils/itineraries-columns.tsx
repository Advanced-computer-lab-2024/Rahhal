import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronRight } from 'lucide-react';
import { ItineraryView } from '@/features/admin/components/ItineraryView';

export type TRating = {
  user: string;
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
    owner: string;
    appropriate: boolean;
    active: boolean;
};

function calculateAverageRating(ratings: TRating[]): number {
  if (ratings.length === 0) {
    return 0;
  }

  const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
  return totalRating / ratings.length;
}

export const itinerariesColumns: ColumnDef<TItinerary>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'ratings',
    header: 'Rating',
    cell: ({ row }) => (
      <div className="capitalize">{calculateAverageRating(row.original.ratings)}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div>
        {row.original.appropriate ? (
          <span className="text-muted-foreground">Appropriate</span>
        ) : (
          <span className="text-muted-foreground">Inappropriate</span>
        )}
      </div>
    ),
  },
  {
    id: 'actions',
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
        />
      </div>
    ),
  },
];