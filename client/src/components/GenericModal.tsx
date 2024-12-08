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

      <DialogContent className="max-w-[90vw] max-h-[90vh] w-1/2 h-full flex flex-col">
        <DialogHeader>
          {customHeader || (
            <>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </>
          )}
        </DialogHeader>
        <ScrollArea className="flex-grow">
          <div className="flex-1 space-y-4 px-4">{children && children.map((child) => child)}</div>
        </ScrollArea>

        {customFooter || (
          <DialogFooter className="grid grid-cols-2 w-full px-4">
            <div className="justify-self-start">
              {showDeleteButton && (
                <Button onClick={onDelete} variant="destructive">
                  Delete
                </Button>
              )}
            </div>
            <div className="justify-self-end">
              <Button onClick={handleSubmit} className="bg-[#1d3c51]">
                Save changes
              </Button>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
