import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import RatingForm from "./RatingForm"


interface RatingFormDialogProps {
    buttonRef: React.RefObject<HTMLButtonElement>;
    onSubmit: () => void;
    }

export function RatingFormDialog({ buttonRef, onSubmit }: RatingFormDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button ref={buttonRef} hidden={true}></button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rate Your Experience</DialogTitle>
          
        </DialogHeader>
        <RatingForm onSubmit={onSubmit} ratingEntities={{}} />
        
      </DialogContent>
    </Dialog>
  )
}
