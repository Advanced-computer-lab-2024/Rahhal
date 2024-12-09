import DoubleCheckPopUpWrapper from "@/components/DoubleCheckPopUpWrapper";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

export default function Header({
  onSave,
  onDelete,
  isNew = false,
}: {
  onSave: () => void;
  onDelete: () => void;
  isNew: boolean;
}) {
  const [isDoubleCheckDialogOpen, setIsDoubleCheckDialogOpen] = useState(false);
  return (
    <div className="flex justify-between px-2 items-center">
      <div className="flex gap-3 items-center">
        {!isNew && (
          <DoubleCheckPopUpWrapper
            isOpen={isDoubleCheckDialogOpen}
            onAction={onDelete}
            onCancel={() => setIsDoubleCheckDialogOpen(false)}
            customMessage="Your itinerary will be permanently deleted."
          >
            <Button onClick={() => setIsDoubleCheckDialogOpen(true)} variant="destructive">
              Delete
            </Button>
          </DoubleCheckPopUpWrapper>
        )}
        <Button onClick={onSave}> {isNew ? "Create" : "Save Changes"}</Button>
      </div>
      <DialogTitle className="text-xl xl:text-3xl mr-4 content-center">
        Itinerary Details
      </DialogTitle>
    </div>
  );
}
