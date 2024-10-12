import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import PriceCategoryEdit from "./PriceCategoryEdit";
import PriceCategoryNonEdit from "./PriceCategoryNonEdit";
import EditSaveButton from "../EditSaveButton";

interface TicketType {
  title: string;
  priceCategories: Record<string, number>;
  initialIsDisabled?: boolean;
  onPriceCategoriesChange: (priceCategories: Record<string, number>) => void;
}

const PriceCategories = ({
  title,
  priceCategories,
  initialIsDisabled = false,
  onPriceCategoriesChange,
}: TicketType) => {
  const [isDisabled, setIsDisabled] = useState(initialIsDisabled);
  const [ticketTypes, setTicketTypes] = useState(priceCategories);
  const [newType, setNewType] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [editingType, setEditingType] = useState<string | null>(null);
  const [editType, setEditType] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const addTicketType = () => {
    if (newType && newPrice) {
      const updatedTicketTypes = { ...ticketTypes, [newType]: parseFloat(newPrice) };
      setTicketTypes(updatedTicketTypes);
      setNewType("");
      setNewPrice("");
      onPriceCategoriesChange(updatedTicketTypes);
    }
  };

  const removeTicketType = (type: string) => {
    const { [type]: removed, ...rest } = ticketTypes;
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
      <div className="p-3 flex justify-between">
        <CardTitle className="text-sm">{title}</CardTitle>
        <EditSaveButton
          isDisabled={isDisabled}
          saveChanges={() => setIsDisabled(true)}
          toggleEditMode={() => setIsDisabled(false)}
        />
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
                  setEditPrice={setEditPrice}
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
          {!isDisabled && (
            <div className="flex space-x-2">
              <Input
                placeholder="Type"
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Price"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
              <Button onClick={addTicketType}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceCategories;
