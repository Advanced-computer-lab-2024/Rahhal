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

interface GenericModalProps {
  title: string;
  description: string;
  dialogTrigger: React.ReactNode;
  children: React.ReactNode[];
  onSubmit: () => void;
}

export function GenericModal({ title, description, dialogTrigger, children, onSubmit }: GenericModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent className="width-full max-h-[80%] rounded-md border p-4 overflow-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex-1 py-4 overflow-auto">
          {children && children.map((child, index) => <div key={index} className="grid items-center">{child}</div>)}
        </div>
        <DialogFooter>
          <Button onClick={onSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}