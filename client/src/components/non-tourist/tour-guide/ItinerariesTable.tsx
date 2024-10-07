import { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import {itinerariesColumns , TItinerary} from "@/table-columns/tour-guide-columns";
import {fetchItineraries} from "@/api-calls/itineraries-api-calls";
import DataTableAddButton from "../DataTableAddButton";
import { ItinerariesModal } from "./ItineraryModal";

function TourGuideView() {
  const [itineraries, setItineraries] = useState<TItinerary[]>([]);

    useEffect(() => {
        fetchItineraries().then((data) => {
            setItineraries(data);
        });
    }, []);

 return (
    <>
    <DataTable 
    data={itineraries}
    columns={itinerariesColumns}
    newRowModal={
        <ItinerariesModal itineraryData ={undefined} dialogTrigger={<DataTableAddButton />} />
    }
    />
    </>
 );
}

export default TourGuideView;

  