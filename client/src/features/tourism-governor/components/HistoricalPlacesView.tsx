import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import {
  THistoricalPlace,
  historicalPlacesColumns,
} from "@/features/tourism-governor/utils/tourism-governor-columns";
import { fetchUserHistoricalPlaces, deleteHistoricalPlace } from "@/api-calls/historical-places-api-calls";
import { HistoricalPlacesModal } from "./HistoricalPlacesModal";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { STATUS_CODES } from "@/lib/constants";
import { cn } from "@/lib/utils";

function HistoricalPlacesView() {
  const [historicalPlaces, setHistoricalPlaces] = useState<THistoricalPlace[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const init = async () => {
      if (id) {
        const data = await fetchUserHistoricalPlaces(id);

        // convert string dates fetched from the db to Date objects
        data.forEach((place: THistoricalPlace) => {
          place.openingHours.open = new Date(place.openingHours.open);
          place.openingHours.close = new Date(place.openingHours.close);
        });
        setHistoricalPlaces(data);
      }
    };
    init();
  }, []);

  const handleHistoricalPlaceDelete = async (id: string) => {
    try {
      const response = await deleteHistoricalPlace(id);
      if (response.status === STATUS_CODES.STATUS_OK) {
        toast({
          title: "Success",
          description: "Historical place deleted successfully",
          style: {
            backgroundColor: "#34D399",
            color: "white",
          },
        });

        const newHistoricalPlaces = historicalPlaces.filter((place) => place._id !== id);
        setHistoricalPlaces(newHistoricalPlaces);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as any).response?.data?.message || "Error deleting historical place",
        variant: "destructive",
      });
    }
  };

  const handleHistoricalPlaceUpdate = (place: THistoricalPlace) => {
    const newHistoricalPlaces = historicalPlaces.map((oldPlace) => {
      if (oldPlace._id === place._id) {
        return place;
      }
      return oldPlace;
    });
    setHistoricalPlaces(newHistoricalPlaces);
  };

  return (
    <div className="container m-auto">
      <h1
        className={cn(
          "text-3xl font-bold tracking-tight",
          "bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent",
        )}
      >
        Historical Places
      </h1>
      {id ? (
        <DataTable
          data={historicalPlaces}
          columns={historicalPlacesColumns(handleHistoricalPlaceDelete, handleHistoricalPlaceUpdate)}
          newRowModal={
            <HistoricalPlacesModal
              userId={id}
              historicalPlaceData={undefined}
              dialogTrigger={<DataTableAddButton className="bg-[#1d3c51]" />}
              onDelete={handleHistoricalPlaceDelete}
              onSubmit = { (newHistoricalPlace) => {
                setHistoricalPlaces((prev) => [...prev, newHistoricalPlace]);
              }}
            />
          }
        />
      ) : (
        <p>Resource not found</p>
      )}
    </div>
  );
}

export default HistoricalPlacesView;
