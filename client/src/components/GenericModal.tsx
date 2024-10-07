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
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface GenericModalProps {
  title: string;
  description: string;
  dialogTrigger: React.ReactNode;
  children: React.ReactNode[];
  onSubmit: () => void;
}

export function GenericModal({
  title,
  description,
  dialogTrigger,
  children,
  onSubmit,
}: GenericModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      {/* <DialogContent className="width-full max-h-[80%] rounded-md border p-4 overflow-auto"> */}
      <DialogContent className="max-w-[90vw] max-h-[90vh] w-1/2 h-full flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow">
          <div className="flex-1 space-y-4 px-4">
            {children &&
              children.map((child, index) => (
                <div key={index} className="grid items-center">
                  {child}
                </div>
              ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={onSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
