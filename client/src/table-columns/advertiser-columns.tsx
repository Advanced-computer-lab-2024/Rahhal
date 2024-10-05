import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { ActivitiesModal } from "@/components/non-tourist/ActivityModal";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

// Activity type

export type Activity = {
  id: string;
  name: string;
  date: Date;
  time: Date;
  location: { longitude: number; latitude: number };
  price: number | { min: number; max: number };
  category: string;
  tags: string[];
  specialDiscounts: string[];
  isBookingOpen: boolean;
  preferenceTags: string[];
  ratings: number[];
};

// Columns configuration
export const activitiesColumns: ColumnDef<Activity>[] = [
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
    header: "price",
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
    accessorKey: "specialDiscounts",
    header: "specialDiscounts",
    cell: ({ row }) => <div className="capitalize">{row.getValue("specialDiscounts")}</div>,
  },
  {
    accessorKey: "isBookingOpen",
    header: "isBookingOpen",
    cell: ({ row }) => <Checkbox checked={row.getValue("isBookingOpen")} />,
  },
  {
    accessorKey: "preferenceTags",
    header: "preferenceTags",
    cell: ({ row }) => (
      <div>
        {(row.getValue("preferenceTags") as string[]).map((tag) => (
          <Badge key={tag} variant="default" className="mr-1">
            {tag}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "ratings",
    header: "ratings",
    cell: ({ row }) => <div className="capitalize">{row.getValue("ratings")}</div>,
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
              <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-transparent">
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
