import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import {
  THistoricalPlace,
  historicalPlacesColumns,
} from "@/features/tourism-governor/utils/tourism-governor-columns";
import { fetchUserHistoricalPlaces } from "@/api-calls/historical-places-api-calls";
import { HistoricalPlacesModal } from "./HistoricalPlacesModal";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { useParams } from "react-router-dom";
import useUserStore from "@/stores/user-state-store";

function HistoricalPlacesView() {
  const [historicalPlaces, setHistoricalPlaces] = useState<THistoricalPlace[]>([]);
  // const { id } = useParams();
  const { id } = useUserStore();

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
              historicalPlaceData={undefined}
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

export default HistoricalPlacesView;
