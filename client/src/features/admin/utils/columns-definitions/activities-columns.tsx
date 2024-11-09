import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { ActivityView } from "@/features/admin/components/ActivityView";

export type TRating = {
  userId: string;
  userName: string;
  rating: number;
  review?: string;
};

export type TActivity = {
  _id?: string;
  name: string;
  description: string;
  images: string[];
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
  isAppropriate: boolean;
};


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
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
  },
  {
    accessorKey: "ratings",
    header: "Average Rating",
    cell: ({ row }) => (
      <div className="capitalize">{calculateAverageRating(row.getValue("ratings"))}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
        {row.original.isAppropriate ? (
          <span className="text-muted-foreground">Appropriate</span>
        ) : (
          <span className="text-muted-foreground">Inappropriate</span>
        )}
      </div>
    ),
  },
    {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <ActivityView
            activityData={row.original}
            dialogTrigger={
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">View Details</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            }
          />
        </div>
      );
    },
  },
];