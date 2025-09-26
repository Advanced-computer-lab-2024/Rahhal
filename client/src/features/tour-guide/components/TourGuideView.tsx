import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import {
  itinerariesColumns,
  TItinerary,
} from "@/features/tour-guide/utils/tour-guide-columns";
import { fetchItinerariesByOwner } from "@/api-calls/itineraries-api-calls";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { ItinerariesModal } from "./ItineraryModal";
import { TUser } from "@/types/user";
import { getUserById } from "@/api-calls/users-api-calls";

import { cn } from "@/lib/utils";
import useUserStore from "@/stores/user-state-store";

function TourGuideView() {
  const { id } = useUserStore();
  const [itineraries, setItineraries] = useState<TItinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<TUser>();

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const itinerariesData: any = await fetchItinerariesByOwner(id!);
      const userData = await getUserById(id!);
      setItineraries(itinerariesData);
      setUser(userData);
      setLoading(false);
    };

    init();
  }, []);

  if (loading) return <div className="w-full text-center py-8">Loading...</div>;
  return (
    <div className="w-full max-w-full mx-auto">
      <h1
        className={cn(
          "text-2xl sm:text-3xl font-bold tracking-tight mb-6",
          "bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
        )}
      >
        Itineraries
      </h1>
      <div className="w-full overflow-hidden">
        <DataTable
          data={itineraries}
          columns={itinerariesColumns}
          newRowModal={
            <ItinerariesModal
              itineraryData={undefined}
              dialogTrigger={<DataTableAddButton />}
              username={user?.firstName + " " + user?.lastName}
            />
          }
        />
      </div>
    </div>
  );
}

export default TourGuideView;
