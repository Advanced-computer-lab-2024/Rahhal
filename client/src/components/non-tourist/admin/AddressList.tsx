import React, { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ShortText from "@/components/ShortText";

interface AddressListProps {
  initialAddresses: string[];
  onAddressesChange: (addresses: string[]) => void;
  isDisabled?: boolean;
}

const AddressList = ({ initialAddresses, onAddressesChange, isDisabled }: AddressListProps) => {
  const [addresses, setAddresses] = useState(initialAddresses);

  const addAddress = () => {
    setAddresses([...addresses, ""]);
    onAddressesChange([...addresses, ""]);
  };

  const removeAddress = (index: number) => {
    const newAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(newAddresses);
  };

  const updateAddress = (index: number, value: string) => {
    const newAddresses = [...addresses];
    newAddresses[index] = value;
    setAddresses(newAddresses);
    onAddressesChange(newAddresses);
  };

  return (
    <div className="w-full">
      {addresses.map((address, index) => (
        <div key={index} className="w-full flex items-center">
          <ShortText
            title="Address"
            initialValue={address}
            onSave={(value) => updateAddress(index, value)}
            placeholder="Enter address"
            initialDisabled={isDisabled}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => removeAddress(index)}
            disabled={addresses.length === 1}
            className="mt-4"
          >
            <Trash2 className="h-4 w-4 " />
          </Button>
        </div>
      ))}
      <Button onClick={addAddress} className="w-full mt-2">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Address
      </Button>
    </div>
  );
};

export default AddressList;
