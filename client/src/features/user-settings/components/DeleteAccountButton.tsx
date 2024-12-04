import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { TUser } from "@/types/user";
import { Button } from "@/components/ui/button";
import { deleteUserNoReload } from "@/api-calls/users-api-calls";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

export default function DeleteAccountButton({ user }: { user: TUser }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="rounded-md text-sm font-medium h-9 px-4 py-2">
          Delete My Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your account.
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={async () => {
              try {
                await deleteUserNoReload(user);
                navigate("/");
                window.location.reload();
              } catch (error) {
                if (error instanceof AxiosError) {
                  setOpen(false);
                  toast({
                    title: "Ops, something went wrong!",
                    description: error.response?.data.error,
                    variant: "destructive",
                  });
                }
              }
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
