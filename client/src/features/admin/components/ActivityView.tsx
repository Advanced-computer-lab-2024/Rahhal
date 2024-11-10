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

interface ActivityViewProps {
  activityData?: TActivity;
  dialogTrigger?: React.ReactNode;
}

export function ActivityView({ activityData, dialogTrigger }: ActivityViewProps) {
  const [modalActivityData, setModalActivityData] = useState<TActivity>(
    activityData ?? DEFAULTS.ACTIVITY,
  );

  useEffect(() => {
    if (!activityData) {
      setModalActivityData(DEFAULTS.ACTIVITY);
    }
  }, []);

  const handleSubmit = async () => {
    if (modalActivityData) {
      await updateActivity(modalActivityData, null);
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
