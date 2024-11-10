import { Edit2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

interface PriceCategoryNonEditProps {
  ticket: { type: string; price: number };
  startEditing: (type: string, price: number) => void;
  removeTicketType: (type: string) => void;
}

function PriceCategoryNonEdit({
  ticket,
  startEditing,
  removeTicketType,
}: PriceCategoryNonEditProps) {
  return (
    <>
      <span>
        {ticket.type}: EGP {ticket.price.toFixed(2)}
      </span>
      <div>
        <Button variant="ghost" size="icon" onClick={() => startEditing(ticket.type, ticket.price)}>
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => removeTicketType(ticket.type)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}

export default PriceCategoryNonEdit;
