import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import RatingForm, { TRatingEntity } from "./RatingForm"


interface RatingFormDialogProps {
    buttonRef: React.RefObject<HTMLButtonElement>;
    ratingEntities: Record<string, TRatingEntity>;
    onSubmit: (values: Record<string, any>) => void
    }

export function RatingFormDialog({ buttonRef, ratingEntities, onSubmit }: RatingFormDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button ref={buttonRef} hidden={true}></button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rate Your Experience</DialogTitle>
          
        </DialogHeader>
        <RatingForm onSubmit={onSubmit} ratingEntities={ratingEntities} />
        
      </DialogContent>
    </Dialog>
  )
}
