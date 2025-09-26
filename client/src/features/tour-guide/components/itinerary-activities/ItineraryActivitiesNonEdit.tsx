import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ItineraryActivitiesNonEditProps {
  activity: { id: number; type: string; duration: string };
  startEditing: (activity: {
    id: number;
    type: string;
    duration: string;
  }) => void;
  removeActivity: (id: number) => void;
}

function ItineraryActivitiesNonEdit({
  activity,
  startEditing,
  removeActivity,
}: ItineraryActivitiesNonEditProps) {
  return (
    <div className="flex flex-col sm:flex-row w-full sm:justify-between sm:items-center space-y-2 sm:space-y-0">
      <span className="text-sm sm:text-base">
        {activity.type}: {activity.duration}
      </span>
      <div className="flex justify-end sm:justify-start space-x-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => startEditing(activity)}
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeActivity(activity.id)}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
}

export default ItineraryActivitiesNonEdit;
