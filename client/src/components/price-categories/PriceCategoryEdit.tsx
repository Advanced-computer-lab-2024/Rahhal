import { Check, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface PriceCategoryEditProps {
  editType: string;
  setEditType: (value: string) => void;
  editPrice: string;
  setEditPrice: (value: string) => void;
  saveEdit: () => void;
  cancelEditing: () => void;
}

function PriceCategoryEdit({
  editType,
  setEditType,
  editPrice,
  setEditPrice,
  saveEdit,
  cancelEditing,
}: PriceCategoryEditProps) {
  return (
    <>
      <Input
        value={editType}
        onChange={(e) => setEditType(e.target.value)}
        className="w-1/3 mr-2"
      />
      <Input
        type="number"
        value={editPrice}
        onChange={(e) => setEditPrice(e.target.value)}
        className="w-1/3 mr-2"
      />
      <Button variant="ghost" size="icon" onClick={saveEdit}>
        <Check className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={cancelEditing}>
        <X className="h-4 w-4" />
      </Button>
    </>
  );
}

export default PriceCategoryEdit;
