import  { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PriceCategoryEdit from './PriceCategoryEdit';
import PriceCategoryNonEdit from './PriceCategoryNonEdit';


interface TicketType {
  title: string;
  priceCategories: { type: string; price: number }[];
  onPriceCategoriesChange: (priceCategories: { type: string; price: number }[]) => void;
  
}

const PriceCategories = ({ title, priceCategories, onPriceCategoriesChange }: TicketType) => {

  let priceCategoriesWithId = priceCategories.map((ticket, index) => ({ id: index, ...ticket }));
  
  

  const [ticketTypes, setTicketTypes] = useState(priceCategoriesWithId);
  const [newType, setNewType] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editType, setEditType] = useState('');
  const [editPrice, setEditPrice] = useState('');

  const addTicketType = () => {
    if (newType && newPrice) {
      const newId = ticketTypes.length ? ticketTypes[ticketTypes.length - 1].id + 1 : 1;
      setTicketTypes([...ticketTypes, { id: newId, type: newType, price: parseFloat(newPrice) }]);
      setNewType('');
      setNewPrice('');
      onPriceCategoriesChange([...ticketTypes, { type: newType, price: parseFloat(newPrice) }]);
    }
  };

  const removeTicketType = (id: number) => {
    setTicketTypes(ticketTypes.filter(ticket => ticket.id !== id));
    onPriceCategoriesChange(ticketTypes.filter(ticket => ticket.id !== id));
  };

  const startEditing = (ticket: { id: number; type: string; price: number }) => {
    setEditingId(ticket.id);
    setEditType(ticket.type);
    setEditPrice(ticket.price.toString());
    
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditType('');
    setEditPrice('');

  };

  const saveEdit = () => {
    if (editType && editPrice) {
      setTicketTypes(ticketTypes.map(ticket => 
        ticket.id === editingId ? { ...ticket, type: editType, price: parseFloat(editPrice) } : ticket
      ));
      setEditingId(null);
      setEditType('');
      setEditPrice('');
      onPriceCategoriesChange(ticketTypes.map(ticket => 
        ticket.id === editingId ? { ...ticket, type: editType, price: parseFloat(editPrice) } : ticket
      ));
    }
  };

  return (
    <Card className="m-5 mx-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ticketTypes.map((ticket) => (
            <div key={ticket.id} className="flex justify-between items-center">
              {editingId === ticket.id ? (
                
                  <PriceCategoryEdit
                    editType={editType}
                    setEditType={setEditType}
                    editPrice={editPrice}
                    setEditPrice={setEditPrice}
                    saveEdit={saveEdit}
                    cancelEditing={cancelEditing} />
                
              ) : (
                <>
                  <PriceCategoryNonEdit ticket={ticket} startEditing={startEditing} removeTicketType={removeTicketType} />
                </>
              )}
            </div>
          ))}
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
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceCategories;