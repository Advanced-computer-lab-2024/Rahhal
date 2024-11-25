import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TUser } from "@/types/user";
import { useState } from "react";
import { PaymentOptions } from "./PaymentOptions";
import { CartExample , IOrder, OrderStatus , PaymentMethod } from "../utils/CartExample";

export function DeliveryForm({ user }: { user: Partial<TUser> }) {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod');
  const [errors, setErrors] = useState<{ address?: string; city?: string; postalCode?: string; phone?: string }>({});


  const handleContinueToPayment = () => {
    const newErrors: { address?: string; city?: string; postalCode?: string; phone?: string } = {};

    if (!selectedAddress && !newAddress) {
      newErrors.address = "Address is required";
    }
    if (!selectedAddress && !city) {
      newErrors.city = "City is required";
    }
    if (!selectedAddress && !postalCode) {
      newErrors.postalCode = "Postal code is required";
    }
    if (!phone) {
      newErrors.phone = "Phone is required";
    }


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (saveInfo && newAddress && city) {
      const fullAddress = `${newAddress}, ${city}`;
      const updatedAddresses = [...(user.addresses || []), fullAddress];
      setSelectedAddress(fullAddress);

      console.log("Address saved:", fullAddress);
      console.log("All addresses:", updatedAddresses);
    }

  
    console.log("Selected Address", selectedAddress);
    console.log("Continuing to payment...");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Delivery</h2>
      <p className="ml-2 mt-2 text-sm text-gray-500">
        Delivery is Currently Available in Egypt Only!
      </p>
      <div className="mt-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input placeholder="First name" defaultValue={user.firstName} disabled />
          <Input placeholder="Last name" defaultValue={user.lastName} disabled />
        </div>

        <Select
          value={selectedAddress}
          onValueChange={(value) => {
            if (value === "new") {
              setSelectedAddress("");
              setNewAddress("");
              setCity("");
              setPostalCode("");
            } else {
              setSelectedAddress(value);
              setNewAddress(value);
              setCity("Cairo");
              setPostalCode("11735");
              const newErrors: { address?: string; city?: string; postalCode?: string; phone?: string } = {};
              newErrors.address = "";
              newErrors.city = "";
              newErrors.postalCode = "";
              newErrors.phone = errors.phone;
              setErrors(newErrors);
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

        <Input
          placeholder="Enter new address"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          disabled={selectedAddress !== ""}
          className={errors.address ? "border-red-500" : ""}
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}


        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={selectedAddress !== ""}
            className={errors.city ? "border-red-500" : ""}
          />

          <Input
            placeholder="Postal code (optional)"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            disabled={selectedAddress !== ""}
            className={errors.postalCode ? "border-red-500" : ""}
          />
        </div>

        <div className="relative">
          <Input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        {selectedAddress === "" && (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="save-info"
              checked={saveInfo}
              onCheckedChange={(checked: boolean) => setSaveInfo(checked)}
            />
            <Label htmlFor="save-info">Save this information for next time</Label>
          </div>
        )}
        <PaymentOptions selectedPaymentMethod={selectedPaymentMethod} setSelectedPaymentMethod={setSelectedPaymentMethod} />
        <div className="pt-6">
          <button
            className="w-full bg-[--complimentary-color-dark] hover:bg-[--complimentary-color-fade] text-white py-3 px-4 rounded-md font-medium transition-colors"
            onClick={handleContinueToPayment}
          >
            {selectedPaymentMethod === 'cod' ? "Complete Order" : "Continue to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}