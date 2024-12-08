import { GenericModal } from "@/components/GenericModal";
import { useEffect, useState } from "react";
import { TActivity } from "@/features/admin/utils/columns-definitions/activities-columns";
import { DEFAULTS } from "@/lib/constants";
import { format } from "@/features/admin/utils/key-value-formatters/activity-details-formatter";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { updateActivity } from "@/api-calls/activities-api-calls";
import PictureViewer from "@/components/PictureViewer";
import KeyValuePairGrid from "@/components/KeyValuePairGrid";
import { toast } from "@/hooks/use-toast";
import { STATUS_CODES } from "@/lib/constants";

interface ActivityViewProps {
  activityData?: TActivity;
  dialogTrigger?: React.ReactNode;
  onSubmit?: (activity: TActivity) => void;
}

export function ActivityView({ activityData, dialogTrigger, onSubmit }: ActivityViewProps) {
  const [modalActivityData, setModalActivityData] = useState<TActivity>(
    activityData ?? DEFAULTS.ACTIVITY,
  );

  useEffect(() => {
    if (!activityData) {
      setModalActivityData(DEFAULTS.ACTIVITY);
    }
  }, []);

  const handleSubmit = async () => {
    if (!modalActivityData) return;

    try {
      const response = await updateActivity(modalActivityData, null);
      if (response?.status === STATUS_CODES.STATUS_OK) {
        toast({
          title: "Success",
          description: "Activity saved successfully",
          style: {
            backgroundColor: "#34D399",
            color: "white",
          },
        });
        if (onSubmit) {
          onSubmit(modalActivityData);
          setModalActivityData(DEFAULTS.ACTIVITY);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save activity",
        variant: "destructive",
      });
    }
  };

  return (
    <GenericModal
      title={"Activity Details"}
      description="Activity Details"
      dialogTrigger={dialogTrigger}
      onSubmit={handleSubmit}
    >
      <KeyValuePairGrid
        data={modalActivityData}
        formatter={format}
        excludedFields={[
          "_id",
          "isAppropriate",
          "createdAt",
          "updatedAt",
          "__v",
          "tags",
          "owner",
          "images",
        ]}
      />
      <div className="flex items-center space-x-2 pt-4">
        <PictureViewer
          title="Activity Images"
          description="Activity Images"
          imageSources={modalActivityData.images}
        />
        <Checkbox
          id="inappropriate"
          checked={!modalActivityData.isAppropriate}
          onCheckedChange={(checked) => {
            setModalActivityData({
              ...modalActivityData,
              isAppropriate: !checked,
            });
          }}
        />
        <Label htmlFor="inappropriate">Inappropriate Activity</Label>
      </div>
    </GenericModal>
  );
}
