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
import { cn } from "@/lib/utils";
import useUserStore from "@/stores/user-state-store";

function HistoricalTagsView() {
  const [historicalTags, setHistoricalTags] = useState<THistoricalTag[]>([]);
  const [loading, setLoading] = useState(true);

  const { id } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchUserHistoricalTags(id!);
      setHistoricalTags(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleHistoricalTagUpdate = (tag: THistoricalTag) => {
    const newHistoricalTags = historicalTags.map((oldTag) => {
      if (oldTag._id === tag._id) {
        return tag;
      }
      return oldTag;
    });
    setHistoricalTags(newHistoricalTags);
  };

  if (loading) return <div className="w-full text-center py-8">Loading...</div>;
  return (
    <div className="container m-auto">
      <h1
        className={cn(
          "text-3xl font-bold tracking-tight",
          "bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
        )}
      >
        Historical Tags
      </h1>
      <DataTable
        data={historicalTags}
        columns={historicalTagsColumns(handleHistoricalTagUpdate)}
        newRowModal={
          <HistoricalTagsModal
            historicalTagsData={undefined}
            dialogTrigger={<DataTableAddButton />}
            onSubmit={(newTag) => {
              setHistoricalTags((prev) => [...prev, newTag]);
            }}
          />
        }
      />
    </div>
  );
}

export default HistoricalTagsView;
