import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import DoubleCheckPopUpWrapper from "./DoubleCheckPopUpWrapper";

interface GenericModalProps {
  title: string;
  description: string;
  dialogTrigger: React.ReactNode;
  showDeleteButton?: boolean;
  children: React.ReactNode[];
  customHeader?: React.ReactNode;
  customFooter?: React.ReactNode;
  onSubmit: () => void;
  onDelete?: () => void;
}

export function GenericModal({
  title,
  description,
  dialogTrigger,
  children,
  showDeleteButton = false,
  customHeader,
  customFooter,
  onSubmit,
  onDelete,
}: GenericModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDoubleCheckDialogOpen, setIsDoubleCheckDialogOpen] = useState(false);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        {dialogTrigger}
      </DialogTrigger>

      <DialogContent className="!w-auto !min-w-[320px] !max-w-[90vw] sm:!max-w-[80vw] md:!max-w-[70vw] lg:!max-w-[60vw] xl:!max-w-[50vw] !max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader className="flex-shrink-0">
          {customHeader || (
            <>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </>
          )}
        </DialogHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="space-y-4 px-4 sm:px-6 py-2">
            {children && children.map((child) => child)}
          </div>
        </ScrollArea>

        {customFooter || (
          <DialogFooter className="flex-shrink-0 flex flex-col sm:flex-row gap-2 sm:justify-between px-4 sm:px-6 py-4">
            <div className="order-2 sm:order-1">
              {showDeleteButton && (
                <DoubleCheckPopUpWrapper
                  isOpen={isDoubleCheckDialogOpen}
                  onCancel={() => setIsDoubleCheckDialogOpen(false)}
                  onAction={onDelete ?? (() => {})}
                  customMessage="This will permanently delete this item."
                >
                  <Button
                    onClick={() => setIsDoubleCheckDialogOpen(true)}
                    variant="destructive"
                    className="w-full sm:w-auto"
                  >
                    Delete
                  </Button>
                </DoubleCheckPopUpWrapper>
              )}
            </div>
            <div className="order-1 sm:order-2">
              <Button
                onClick={handleSubmit}
                className="bg-[#1d3c51] w-full sm:w-auto"
              >
                Save changes
              </Button>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
