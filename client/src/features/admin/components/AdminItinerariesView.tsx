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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const data = await fetchItineraries();
      setItineraries(data);
      setLoading(false);
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

  if (loading) return <div className="w-full text-center py-8">Loading...</div>;
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1
        className={cn(
          "text-2xl sm:text-3xl font-bold tracking-tight mb-6",
          "bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
        )}
      >
        Itineraries
      </h1>
      <DataTable
        data={itineraries}
        columns={itinerariesColumns(handleItineraryUpdate)}
      />
    </div>
  );
}

export default AdminItinerariesView;
