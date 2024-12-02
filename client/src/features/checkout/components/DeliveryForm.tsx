import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TUser } from "@/types/user";

export function DeliveryForm({
  user,
  selectedAddress,
  setSelectedAddress,
  newAddress,
  setNewAddress,
  city,
  setCity,
  postalCode,
  setPostalCode,
  phone,
  setPhone,
  saveInfo,
  setSaveInfo,
  errors,
  setErrors,
}: {
  user: Partial<TUser>;
  selectedAddress: string;
  setSelectedAddress: (address: string) => void;
  newAddress: string;
  setNewAddress: (address: string) => void;
  city: string;
  setCity: (city: string) => void;
  postalCode: string;
  setPostalCode: (postalCode: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  saveInfo: boolean;
  setSaveInfo: (save: boolean) => void;
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: (method: string) => void;
  errors: {
    address?: string;
    city?: string;
    postalCode?: string;
    phone?: string;
  };
  setErrors: (errors: {
    address?: string;
    city?: string;
    postalCode?: string;
    phone?: string;
  }) => void;
}) {
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
              const newErrors: {
                address?: string;
                city?: string;
                postalCode?: string;
                phone?: string;
              } = {};
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
      </div>
    </div>
  );
}
