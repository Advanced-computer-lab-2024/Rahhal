import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";

export default function Header({
  onSave,
  onDelete,
  isNew = false,
}: {
  onSave: () => void;
  onDelete: () => void;
  isNew: boolean;
}) {
  return (
    <div className="flex justify-between px-2 items-center">
      <div className="flex gap-3 items-center">
        {!isNew && (
          <Button onClick={onDelete} variant="destructive">
            Delete
          </Button>
        )}
        <Button onClick={onSave}> {isNew ? "Create" : "Save Changes"}</Button>
      </div>
      <DialogTitle className="text-xl xl:text-3xl mr-4 content-center">
        Itinerary Detials
      </DialogTitle>
    </div>
  );
}
