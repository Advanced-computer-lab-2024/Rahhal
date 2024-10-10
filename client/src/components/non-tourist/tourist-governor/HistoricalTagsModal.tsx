import { GenericModal } from "../../GenericModal";
import { useEffect, useState } from "react";
import { submitHistoricalTags } from "@/api-calls/historical-tags-api-calls";
import ShortText from "@/components/ShortText";
import { DEFAULTS } from "@/lib/constants";
import { THistoricalTag } from "@/table-columns/historical-tags-columns";

interface HistoricalTagsModalProps {
  historicalTagsData?: THistoricalTag;
  dialogTrigger?: React.ReactNode;
}

export function HistoricalTagsModal({
  historicalTagsData,
  dialogTrigger,
}: HistoricalTagsModalProps) {
  const isNewHistoricalTag = historicalTagsData === undefined; // check if the category is new
  const [modalHistoricalTagData, setModalHistoricalTagData] = useState<THistoricalTag | undefined>(
    historicalTagsData,
  ); // current category data present in the modal

  useEffect(() => {
    // if the historical tag is new, set the default values
    if (isNewHistoricalTag) {
      setModalHistoricalTagData(DEFAULTS.HISTORICAL_TAG);
    }
  }, []);

  // create generic modal with components based on data type of columns
  return (
    <GenericModal
      title={historicalTagsData?.name ?? "New Historical Tag"}
      description="Historical Tag Details"
      dialogTrigger={dialogTrigger}
      onSubmit={() => {
        submitHistoricalTags(modalHistoricalTagData, isNewHistoricalTag);
      }}
    >
      <ShortText
        title="Name"
        initialValue={modalHistoricalTagData?.name ?? ""}
        onSave={(value) =>
          setModalHistoricalTagData(
            modalHistoricalTagData ? { ...modalHistoricalTagData, name: value } : undefined,
          )
        }
        placeholder={"Enter Tag Name"}
        initialDisabled={!isNewHistoricalTag}
        type={"text"}
      />
      <></>
    </GenericModal>
  );
}
