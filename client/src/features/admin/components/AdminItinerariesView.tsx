import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import {
  itinerariesColumns,
  TItinerary,
} from "@/features/admin/utils/columns-definitions/itineraries-columns";
import { fetchItineraries } from "@/api-calls/itineraries-api-calls";

function AdminItinerariesView() {
  const [itineraries, setItineraries] = useState<TItinerary[]>([]);

  useEffect(() => {
    const init = async () => {
      const data = await fetchItineraries();
      setItineraries(data);
    };
    init();
  }, []);

  return (
    <div className="container m-auto">
      <DataTable data={itineraries} columns={itinerariesColumns} />
    </div>
  );
}

export default AdminItinerariesView;
