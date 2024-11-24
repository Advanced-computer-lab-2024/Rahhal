import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TUser } from "@/types/user"
import { useState } from "react"




export function DeliveryForm({ user }: { user: Partial<TUser> }) {

  const [selectedAddress, setSelectedAddress] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);

  const handleContinueToPayment = () => {
    if (saveInfo && newAddress && city) {

      const fullAddress = `${newAddress}, ${city}`;


      const updatedAddresses = [...(user.addresses || []), fullAddress];
      setSelectedAddress(fullAddress);

      console.log("Address saved:", fullAddress);
      console.log("All addresses:", updatedAddresses);
      
    }

    console.log("Selected Address",selectedAddress); 
    console.log("Continuing to payment...");
  };
  return (
    <div>
      <h2 className="text-xl font-semibold">Delivery</h2>
      <div className="mt-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input placeholder="First name" defaultValue={user.firstName} disabled />
          <Input placeholder="Last name" defaultValue={user.lastName} disabled />
        </div>

        <Select
          value={selectedAddress}
          onValueChange={(value) => {
            if (value === "new") {
              setSelectedAddress("")
              setNewAddress("")
              setCity("")
              setPostalCode("")
            } else {
              setSelectedAddress(value)
              setNewAddress("")
              setCity("")
              setPostalCode("")
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a saved address or enter a new one" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">Enter a new address</SelectItem>
            {user.addresses?.map((address, index) => (
              <SelectItem key={index} value={address}>
                {address}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedAddress === "" && (
          <>
            <Input
              placeholder="Enter new address"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Input
                placeholder="Postal code (optional)"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="relative">
          <Input placeholder="Phone" />
        </div>

       {selectedAddress === "" && ( <div className="flex items-center space-x-2">
          <Checkbox
            id="save-info"
            checked={saveInfo}
            onCheckedChange={(checked: boolean) => setSaveInfo(checked)}
          />
          <Label htmlFor="save-info">Save this information for next time</Label>
        </div>)}
        <div className="pt-6">
          <button
            className="w-full bg-[--complimentary-color-dark] hover:bg-[--complimentary-color-fade] text-white py-3 px-4 rounded-md font-medium transition-colors"
            onClick={handleContinueToPayment}
          >
            Continue to payment
          </button>
        </div>
      </div>
    </div>
  )

}