import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ItineraryActivitiesNonEditProps {
  activity: { id: number; type: string; duration: string };
  startEditing: (activity: { id: number; type: string; duration: string }) => void;
  removeActivity: (id: number) => void;
}

function ItineraryActivitiesNonEdit({
  activity,
  startEditing,
  removeActivity
}: ItineraryActivitiesNonEditProps) {
  return (
    <>
      <span>
        {activity.type}: {activity.duration}
      </span>
      <div>
        <Button variant="ghost" size="icon" onClick={() => startEditing(activity)}>
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => removeActivity(activity.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}

export default ItineraryActivitiesNonEdit;