import DoubleCheckPopUpWrapper from "@/components/DoubleCheckPopUpWrapper";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

export default function Header({
  onDelete,
  isNew = false,
}: {
  onSave: () => void;
  onDelete: () => void;
  isNew: boolean;
}) {
  const [isDoubleCheckDialogOpen, setIsDoubleCheckDialogOpen] = useState(false);
  return (
    <div className="flex flex-col sm:flex-row justify-between px-2 items-center space-y-2 sm:space-y-0">
      <div className="flex gap-3 items-center order-2 sm:order-1">
        {!isNew && (
          <DoubleCheckPopUpWrapper
            isOpen={isDoubleCheckDialogOpen}
            onAction={onDelete}
            onCancel={() => setIsDoubleCheckDialogOpen(false)}
            customMessage="Your itinerary will be permanently deleted."
          >
            <Button
              onClick={() => setIsDoubleCheckDialogOpen(true)}
              variant="destructive"
              size="sm"
            >
              Delete
            </Button>
          </DoubleCheckPopUpWrapper>
        )}
      </div>
      <DialogTitle className="text-lg sm:text-xl xl:text-3xl content-center order-1 sm:order-2">
        Itinerary Details
      </DialogTitle>
    </div>
  );
}
