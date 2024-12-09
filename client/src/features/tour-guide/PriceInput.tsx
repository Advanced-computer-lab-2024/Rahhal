import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PriceInputProps {
  title: string;
  initialPrice: number;
  initialIsDisabled?: boolean;
  onPriceChange: (price: number) => void;
}

const PriceInput = ({
  title,
  initialPrice,
  initialIsDisabled = false,
  onPriceChange,
}: PriceInputProps) => {
  const [isDisabled, setIsDisabled] = useState(initialIsDisabled);
  const [price, setPrice] = useState(initialPrice);

  const handlePriceChange = (value: string) => {
    const newPrice = parseFloat(value);
    if (!isNaN(newPrice) && newPrice >= 0) {
      setPrice(newPrice);
      onPriceChange(newPrice);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <Label>{title}</Label>
        <Input
          type="number"
          value={price}
          onChange={(e) => handlePriceChange(e.target.value)}
          placeholder="Enter price"
          min={0}
          step={0.01}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};

export default PriceInput;