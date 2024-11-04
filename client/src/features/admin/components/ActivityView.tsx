import { GenericModal } from "@/components/GenericModal";
import { useEffect, useState } from "react";
import { TActivity } from "@/features/admin/utils/columns-definitions/activities-columns";
import { DEFAULTS } from "@/lib/constants";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "@/features/admin/utils/columns-definitions/activity-details-formatter";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { updateActivity } from "@/api-calls/activities-api-calls";

interface ActivityViewProps {
  activityData?: TActivity;
  dialogTrigger?: React.ReactNode;
}

type KeyValuePairViewProps = {
  activity: Partial<TActivity>;
};

const KeyValuePairView = ({ activity }: KeyValuePairViewProps) => {
  const entries = Object.entries(activity).filter(([key, value]) => {
    const excludedFields = [
      "_id",
      "isAppropriate",
      "createdAt",
      "updatedAt",
      "__v",
    ];
    if (!value) return false;
    if (Array.isArray(value) && value.length === 0) return false;
    if (excludedFields.includes(key)) return false;
    return true;
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Activity Details</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entries.map(([key, value]) => {
            const [formattedKey, formattedValue] = format(key, value);
            return (
              <div
                key={key}
                className="flex flex-col p-4 bg-muted rounded-lg overflow-hidden break-words"
              >
                <span className="text-sm font-medium text-muted-foreground mb-1">
                  {formattedKey}
                </span>
                <span className="text-base">{formattedValue}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export function ActivityView({
  activityData,
  dialogTrigger,
}: ActivityViewProps) {
  const [modalActivityData, setModalActivityData] = useState<TActivity>(
    activityData ?? DEFAULTS.ACTIVITY
  );

  useEffect(() => {
    if (!activityData) {
      setModalActivityData(DEFAULTS.ACTIVITY);
    }
  }, []);

  const handleSubmit = async () => {
    if (modalActivityData) {
      await updateActivity(modalActivityData);
    }
  }

  return (
    <GenericModal
      title={"Activity Details"}
      description="Activity Details"
      dialogTrigger={dialogTrigger}
      onSubmit={handleSubmit}
    >
      <KeyValuePairView activity={modalActivityData} />
      <div className="flex items-center space-x-2 pt-4">
        <Checkbox
          id="inappropriate"
          checked={!modalActivityData.isAppropriate}
          onCheckedChange={(checked) => {
            setModalActivityData({
              ...modalActivityData,
              isAppropriate: !checked
            });
          }}
        />
        <Label htmlFor="inappropriate">Inappropriate Activity</Label>
      </div>
    </GenericModal>
  );
}