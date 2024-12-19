import { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import PriceCategoryEdit from "./PriceCategoryEdit";
import PriceCategoryNonEdit from "./PriceCategoryNonEdit";
import EditSaveButton from "../EditSaveButton";

interface PriceCategoriesProps {
  title: string;
  initialTicketTypes: Record<string, number>;
  onPriceCategoriesChange: (ticketTypes: Record<string, number>) => void;
}

export default function PriceCategories({
  title,
  initialTicketTypes = {}, // Default empty object
  onPriceCategoriesChange,
}: PriceCategoriesProps) {
  const [ticketTypes, setTicketTypes] = useState<Record<string, number>>(initialTicketTypes || {});
  const [editingType, setEditingType] = useState<string | null>(null);
  const [editType, setEditType] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const [newType, setNewType] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const addNewTicketType = () => {
    if (newType && newPrice) {
      const updatedTicketTypes = {
        ...ticketTypes,
        [newType]: parseFloat(newPrice),
      };
      setTicketTypes(updatedTicketTypes);
      onPriceCategoriesChange(updatedTicketTypes);
      // Reset inputs
      setNewType("");
      setNewPrice("");
    }
  };

  const removeTicketType = (type: string) => {
    const { [type]: removed, ...rest } = ticketTypes || {};
    setTicketTypes(rest);
    onPriceCategoriesChange(rest);
  };

  const startEditing = (type: string, price: number) => {
    setEditingType(type);
    setEditType(type);
    setEditPrice(price.toString());
  };

  const cancelEditing = () => {
    setEditingType(null);
    setEditType("");
    setEditPrice("");
  };

  const saveEdit = () => {
    if (editType && editPrice && editingType) {
      const updatedTicketTypes = { ...ticketTypes };
      if (editingType !== editType) {
        delete updatedTicketTypes[editingType];
      }
      updatedTicketTypes[editType] = parseFloat(editPrice);
      setTicketTypes(updatedTicketTypes);
      setEditingType(null);
      setEditType("");
      setEditPrice("");
      onPriceCategoriesChange(updatedTicketTypes);
    }
  };

  return (
    <Card>
      <div className="p-3">
        <CardTitle className="text-sm">{title}</CardTitle>
      </div>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(ticketTypes).map(([type, price]) => (
            <div key={type} className="flex justify-between items-center">
              {editingType === type ? (
                <PriceCategoryEdit
                  editType={editType}
                  setEditType={setEditType}
                  editPrice={editPrice}
                  setEditPrice={(newPrice) => {
                    setEditPrice(newPrice);
                    const updatedTicketTypes = { ...ticketTypes };
                    updatedTicketTypes[editType || type] = Number(newPrice);
                    setTicketTypes(updatedTicketTypes);
                    onPriceCategoriesChange(updatedTicketTypes);
                  }}
                  saveEdit={saveEdit}
                  cancelEditing={cancelEditing}
                />
              ) : (
                <PriceCategoryNonEdit
                  ticket={{ type, price }}
                  startEditing={() => startEditing(type, price)}
                  removeTicketType={() => removeTicketType(type)}
                />
              )}
            </div>
          ))}

          {/* Add new ticket type */}
          <div className="flex space-x-2 mt-4">
            <Input
              placeholder="Ticket type"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
            <Button variant="ghost" onClick={addNewTicketType} disabled={!newType || !newPrice}>
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
