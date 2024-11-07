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
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await onSubmit();
    setIsOpen(false);
  };

  return (
    <Dialog open = {isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger onClick={()=>setIsOpen(true)} asChild>{dialogTrigger}</DialogTrigger>

      <DialogContent className="max-w-[90vw] max-h-[90vh] w-1/2 h-full flex flex-col">
        <DialogHeader >
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow">
          <div className="flex-1 space-y-4 px-4">{children && children.map((child) => child)}</div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
