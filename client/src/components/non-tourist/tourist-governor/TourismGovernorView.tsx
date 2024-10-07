import { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import {
  THistoricalPlace,
  historicalPlacesColumns,
} from "@/table-columns/tourism-governor-columns";
import { fetchUserHistoricalPlaces } from "@/api-calls/historical-places-api-calls";
import { HistoricalPlacesModal } from "./HistoricalPlacesModal";
import DataTableAddButton from "../DataTableAddButton";
import { useParams } from "react-router-dom";

function TourismGovernorView() {
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

  return (
    <>
      {id ? (
        <DataTable
          data={historicalPlaces}
          columns={historicalPlacesColumns}
          newRowModal={
            <HistoricalPlacesModal
              userId={id}
              historicalPlacesData={undefined}
              dialogTrigger={<DataTableAddButton />}
            />
          }
        />
      ) : (
        <p>Resource not found</p>
      )}
    </>
  );
}

export default TourismGovernorView;
