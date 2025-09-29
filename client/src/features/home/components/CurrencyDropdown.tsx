import {
  useCurrencyStore,
  useRatesStore,
} from "@/stores/currency-exchange-store";
import { ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function CurrencyDropdown() {
  const { currency, setCurrency } = useCurrencyStore();
  const { rates } = useRatesStore();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="border-transparent bg-transparent flex">
            {currency}
            <ChevronDown />
          </button>
        </PopoverTrigger>
        <PopoverContent className="translate-x-[-35%] z-[10000]">
          <Command>
            <CommandInput placeholder="Search item..." />
            <CommandList>
              <CommandEmpty>No item found.</CommandEmpty>
              <CommandGroup>
                {rates.rates
                  ? Object.keys(rates.rates).map((rate) => (
                      <CommandItem
                        key={rate}
                        value={rate}
                        onSelect={(currentValue) => {
                          setCurrency(rate);
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === rate ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {rate}
                      </CommandItem>
                    ))
                  : ""}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
