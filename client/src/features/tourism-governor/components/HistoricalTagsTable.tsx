import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { fetchUserHistoricalTags } from "@/api-calls/historical-tags-api-calls";
import {
  historicalTagsColumns,
  THistoricalTag,
} from "@/features/tourism-governor/utils/historical-tags-columns";
import { HistoricalTagsModal } from "./HistoricalTagsModal";
import { useParams } from "react-router-dom";

function HistoricalTagsView() {
  const [historicalTags, setHistoricalTags] = useState<THistoricalTag[]>([]);

  const { id } = useParams();

  useEffect(() => {
    fetchUserHistoricalTags(id!).then((data) => setHistoricalTags(data));
  }, []);

  return (
    <>
      <DataTable
        data={historicalTags}
        columns={historicalTagsColumns}
        newRowModal={
          <HistoricalTagsModal
            historicalTagsData={undefined}
            dialogTrigger={<DataTableAddButton />}
          />
        }
      />
    </>
  );
}

export default HistoricalTagsView;
