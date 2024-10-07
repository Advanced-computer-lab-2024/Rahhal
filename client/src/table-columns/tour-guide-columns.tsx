import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ChevronRight } from "lucide-react";
import {ItinerariesModal} from "@/components/non-tourist/tour-guide/ItineraryModal";
import { Badge } from "@/components/ui/badge";
import { FaTrash } from "react-icons/fa6";
import {deleteItinerary} from "@/api-calls/itineraries-api-calls";

export type TRating = {
    user: string;
    rating: number;
    review?: string;
  };

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
    preferenceTags: { _id: string; preferenceTag: string }[];
    category: { _id: string; category: string };
    owner: string;
  };

function deleteRow(row: any) {
    deleteItinerary(row.original);
    window.location.reload();
}

function calculateAverageRating(ratings: TRating[]) {
    const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return totalRating / ratings.length;
}

export const itinerariesColumns: ColumnDef<TItinerary>[] = [
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
      accessorKey: "preferenceTags",
      header: "preferenceTags",
      cell: ({ row }) => (
        <div>
          {(row.getValue("preferenceTags") as string[]).map((preferenceTag) => (
            <Badge key={preferenceTag} variant="default" className="mr-1">
              {preferenceTag}
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
  





