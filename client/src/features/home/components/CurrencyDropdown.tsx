import { useCurrencyStore , useRatesStore } from '@/stores/currency-exchange-store'
import AvatarStyles from "../styles/ProfileAvatar.module.css";
import { ChevronDown , Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { getCurrencyExchangeRates } from "@/api-calls/currency-exchange-api-calls";
import { useEffect } from "react";

export default function CurrencyDropdown() {
    const { currency, setCurrency } = useCurrencyStore()
    const { rates , setRates } = useRatesStore()
    useEffect(() => {
        if(!rates.rates)
          getCurrencyExchangeRates().then((data) => {
            setRates(data);
          });
      }, []);


    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    return(
        <>
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <button className="border-transparent bg-transparent flex">
             {currency}
             <ChevronDown />
            </button>
            </PopoverTrigger>
            <PopoverContent className="translate-x-[-35%]">
            <Command>
            <CommandInput placeholder="Search item..." />
            <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
         { 
           rates.rates ? Object.keys(rates.rates).map((rate) => ( 
            
            <CommandItem key={rate} value={rate} onSelect={(currentValue) => {setCurrency(rate);setValue(currentValue === value ? "" : currentValue);setOpen(false)} } > 
            <Check
            className={cn(
              "mr-2 h-4 w-4",
              value === rate ? "opacity-100" : "opacity-0"
            )}/> 
            {rate}
            </CommandItem>
            )) : ""
        }
        </CommandGroup>
        </CommandList>
        </Command>
         </PopoverContent> 
        </Popover>      
        
        </>
    )

}