import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import {
  itinerariesColumns,
  TItinerary,
} from "@/features/admin/utils/columns-definitions/itineraries-columns";
import { fetchItineraries } from "@/api-calls/itineraries-api-calls";
import { cn } from "@/lib/utils";

function AdminItinerariesView() {
  const [itineraries, setItineraries] = useState<TItinerary[]>([]);

  useEffect(() => {
    const init = async () => {
      const data = await fetchItineraries();
      setItineraries(data);
    };
    init();
  }, []);

  const handleItineraryUpdate = (itinerary: TItinerary) => {
    const newItineraries = itineraries.map((oldItinerary) => {
      if (oldItinerary._id === itinerary._id) {
        return itinerary;
      }
      return oldItinerary;
    });
    setItineraries(newItineraries);
  };

  return (
    <div className="container m-auto">
      <h1
        className={cn(
          "text-3xl font-bold tracking-tight",
          "bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent",
        )}
      >
        Itineraries
      </h1>
      <DataTable data={itineraries} columns={itinerariesColumns(handleItineraryUpdate)} />
    </div>
  );
}

export default AdminItinerariesView;
