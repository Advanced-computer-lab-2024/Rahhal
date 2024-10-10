import { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import { itinerariesColumns, TItinerary } from "@/table-columns/tour-guide-columns";
import { fetchItineraries } from "@/api-calls/itineraries-api-calls";
import DataTableAddButton from "../DataTableAddButton";
import { ItinerariesModal } from "./ItineraryModal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link, useParams } from "react-router-dom";

function TourGuideView() {
  const [itineraries, setItineraries] = useState<TItinerary[]>([]);

  useEffect(() => {
    fetchItineraries().then((data) => {
      setItineraries(data);
    });
  }, []);
  const id = useParams<{ id: string }>().id;
  return (
    <>
      <div className=" w-full h-4 flex justify-end">
        <div className="flex justify-end relative z-10 pr-3  h-16 pt-2 items-center">
          <Link to={`/user-settings/${id}`}>
            <Avatar className="h-10 w-10">
              <AvatarFallback>SE</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
      <DataTable
        data={itineraries}
        columns={itinerariesColumns}
        newRowModal={
          <ItinerariesModal itineraryData={undefined} dialogTrigger={<DataTableAddButton />} />
        }
      />
    </>
  );
}

export default TourGuideView;
