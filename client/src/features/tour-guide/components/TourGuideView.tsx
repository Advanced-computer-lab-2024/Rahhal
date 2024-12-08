import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import { itinerariesColumns, TItinerary } from "@/features/tour-guide/utils/tour-guide-columns";
import { fetchItinerariesByOwner } from "@/api-calls/itineraries-api-calls";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { ItinerariesModal } from "./ItineraryModal";
import { TUser } from "@/types/user";
import { getUserById } from "@/api-calls/users-api-calls";
import TourGuideReviews from "./TourGuideReviews";
import ReviewDisplay from "@/components/Ratings";
import { sampleReviews } from "@/lib/utils";
import useUserStore from "@/stores/user-state-store";

function TourGuideView() {
  const { id } = useUserStore();
  const [itineraries, setItineraries] = useState<TItinerary[]>([]);
  const [user, setUser] = useState<TUser>();

  useEffect(() => {
    const init = async () => {
      const itinerariesData : any = await fetchItinerariesByOwner(id!);
      const userData = await getUserById(id!);
      setItineraries(itinerariesData);
      setUser(userData);
    };

    init();
  }, []);

  return (
    <>
      <div className="flex flex-col container m-auto gap-10">
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
    </>
  );
}

export default TourGuideView;
