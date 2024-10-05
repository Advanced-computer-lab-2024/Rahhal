import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PriceCategories = () => {
  const [ticketTypes, setTicketTypes] = useState([
    { id: 1, type: 'Student', price: 10 },
    { id: 2, type: 'Foreign', price: 20 },
    { id: 3, type: 'Native', price: 15 },
  ]);
  const [newType, setNewType] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editType, setEditType] = useState('');
  const [editPrice, setEditPrice] = useState('');

  const addTicketType = () => {
    if (newType && newPrice) {
      const newId = Math.max(...ticketTypes.map(t => t.id), 0) + 1;
      setTicketTypes([...ticketTypes, { id: newId, type: newType, price: parseFloat(newPrice) }]);
      setNewType('');
      setNewPrice('');
    }
  };

  const removeTicketType = (id) => {
    setTicketTypes(ticketTypes.filter(ticket => ticket.id !== id));
  };

  const startEditing = (ticket) => {
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
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Ticket Type Manager</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ticketTypes.map((ticket) => (
            <div key={ticket.id} className="flex justify-between items-center">
              {editingId === ticket.id ? (
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
              ) : (
                <>
                  <span>{ticket.type}: ${ticket.price.toFixed(2)}</span>
                  <div>
                    <Button variant="ghost" size="icon" onClick={() => startEditing(ticket)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => removeTicketType(ticket.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
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