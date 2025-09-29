import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ItineraryActivitiesEditProps {
  editType: string;
  setEditType: (value: string) => void;
  editDuration: string;
  setEditDuration: (value: string) => void;
  saveEdit: () => void;
  cancelEditing: () => void;
}

function ItineraryActivitiesEdit({
  editType,
  setEditType,
  editDuration,
  setEditDuration,
  saveEdit,
  cancelEditing,
}: ItineraryActivitiesEditProps) {
  return (
    <div className="flex flex-col sm:flex-row w-full space-y-2 sm:space-y-0 sm:space-x-2">
      <Input
        value={editType}
        onChange={(e) => setEditType(e.target.value)}
        className="flex-1"
        placeholder="Activity"
      />
      <Input
        value={editDuration}
        onChange={(e) => setEditDuration(e.target.value)}
        className="flex-1"
        placeholder="Duration"
      />
      <div className="flex justify-end sm:justify-start space-x-1">
        <Button variant="ghost" size="icon" onClick={saveEdit}>
          <Check className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={cancelEditing}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default ItineraryActivitiesEdit;
