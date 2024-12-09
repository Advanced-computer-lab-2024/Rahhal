import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DoubleCheckPopUpWrapper({
  isOpen,
  onAction,
  onCancel,
  customMessage,
  ...props
}: {
  isOpen: boolean;
  customMessage: string;
  onAction: () => void;
  onCancel: () => void;
}) {
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>This action cannot be undone. {customMessage}</DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onAction}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
