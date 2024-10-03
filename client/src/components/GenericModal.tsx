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
}

export function GenericModal({ title, description, dialogTrigger, children }: GenericModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent className="width-full h-[80%] rounded-md border p-4">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex-1 py-4 overflow-auto">
          {children.map((child) => (
            <div className="grid items-center">{child}</div>
          ))}
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
