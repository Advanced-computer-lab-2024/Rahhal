import { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import {
  THistoricalPlace,
  historicalPlacesColumns,
} from "@/table-columns/tourism-governor-columns";
import { fetchHistoricalPlaces } from "@/api-calls/historical-places-api-calls";
import { HistoricalPlacesModal } from "./HistoricalPlacesModal";
import DataTableAddButton from "../DataTableAddButton";

function TourismGovernorView() {
  const [historicalPlaces, setHistoricalPlaces] = useState<THistoricalPlace[]>([]);

  useEffect(() => {
    const init = async () => {
      const data = await fetchHistoricalPlaces();

      // convert string dates fetched from the db to Date objects
      data.forEach((place: THistoricalPlace) => {
        place.openingHours.open = new Date(place.openingHours.open);
        place.openingHours.close = new Date(place.openingHours.close);
      });
      setHistoricalPlaces(data);
    };
    init();
  }, []);

  return (
    <>
      <DataTable
        data={historicalPlaces}
        columns={historicalPlacesColumns}
        newRowModal={
          <HistoricalPlacesModal
            historicalPlacesData={undefined}
            dialogTrigger={<DataTableAddButton />}
          />
        }
      />
    </>
  );
}

export default TourismGovernorView;
