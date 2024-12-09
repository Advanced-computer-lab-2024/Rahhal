import { GenericModal } from "@/components/GenericModal";
import { useEffect, useState } from "react";
import { submitHistoricalTags } from "@/api-calls/historical-tags-api-calls";
import { DEFAULTS } from "@/lib/constants";
import { THistoricalTag } from "@/features/tourism-governor/utils/historical-tags-columns";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { STATUS_CODES } from "@/lib/constants";
import { Input } from "@/components/ui/input";

interface HistoricalTagsModalProps {
  historicalTagsData?: THistoricalTag;
  dialogTrigger?: React.ReactNode;
  onSubmit?: (historicalTag: THistoricalTag) => void;
  onDelete?: (id: string) => void;
}

export function HistoricalTagsModal({
  historicalTagsData,
  dialogTrigger,
  onSubmit,
  onDelete,
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

  const handleDelete = () => {
    if (modalHistoricalTagData && onDelete) {
      onDelete(modalHistoricalTagData._id);
    }
  };

  const handleSubmit = async () => {
    if (!modalHistoricalTagData) return;

    try {
      const response = await submitHistoricalTags(modalHistoricalTagData, isNewHistoricalTag);
      if (
        response?.status === STATUS_CODES.STATUS_OK ||
        response?.status === STATUS_CODES.CREATED
      ) {
        toast({
          title: "Success",
          description: "Historical tag saved successfully",
          style: {
            backgroundColor: "#34D399",
            color: "white",
          },
        });
        if (onSubmit) {
          onSubmit(modalHistoricalTagData);
          setModalHistoricalTagData(DEFAULTS.HISTORICAL_TAG);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as any).response?.data?.message || "Error saving historical tag",
        variant: "destructive",
      });
    }
  };

  // create generic modal with components based on data type of columns
  return (
    <GenericModal
      title={historicalTagsData?.name ?? "New Historical Tag"}
      description="Historical Tag Details"
      dialogTrigger={dialogTrigger}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Label>Tag Name</Label>
          <Input
            value={modalHistoricalTagData?.name ?? ""}
            onChange={(e) =>
              setModalHistoricalTagData(
                modalHistoricalTagData
                  ? { ...modalHistoricalTagData, name: e.target.value }
                  : undefined,
              )
            }
            placeholder="Enter Tag Name"
          />
        </div>
      </div>
      <></>
    </GenericModal>
  );
}
