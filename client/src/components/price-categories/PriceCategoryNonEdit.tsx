import { Edit2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

interface PriceCategoryNonEditProps {
  ticket: { id: number; type: string; price: number };
  startEditing: (ticket: { id: number; type: string; price: number }) => void;
  removeTicketType: (id: number) => void;
}

function PriceCategoryNonEdit({
  ticket,
  startEditing,
  removeTicketType,
}: PriceCategoryNonEditProps) {
  return (
    <>
      <span>
        {ticket.type}: ${ticket.price.toFixed(2)}
      </span>
      <div>
        <Button variant="ghost" size="icon" onClick={() => startEditing(ticket)}>
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => removeTicketType(ticket.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}

export default PriceCategoryNonEdit;
