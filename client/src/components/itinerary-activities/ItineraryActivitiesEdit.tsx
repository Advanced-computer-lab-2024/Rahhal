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
  cancelEditing
}: ItineraryActivitiesEditProps) {
  return (
    <>
      <Input
        value={editType}
        onChange={(e) => setEditType(e.target.value)}
        className="w-1/3 mr-2"
      />
      <Input
        value={editDuration}
        onChange={(e) => setEditDuration(e.target.value)}
        className="w-1/3 mr-2"
      />
      <Button variant="ghost" size="icon" onClick={saveEdit}>
        <Check className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={cancelEditing}>
        <X className="h-4 w-4" />
      </Button>
    </>
  );
}

export default ItineraryActivitiesEdit;