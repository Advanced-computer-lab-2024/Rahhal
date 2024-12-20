"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Define the prop types for the component
interface Option {
  value: string;
  label: string;
}

interface ComboboxDemoProps {
  data?: Option[];
  onSelect?: (selectedValue: string) => void;
}

export function ComboboxDemo({ data = [], onSelect }: ComboboxDemoProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(data[0]?.value);

  const handleSelect = (selectedValue: string) => {
    setValue(selectedValue);
    setOpen(false);
    onSelect?.(selectedValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? data.find((item) => item.value === value)?.label : "Select your desired date..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup className="w-80">
              {data.map((item) => (
                <CommandItem key={item.value} value={item.value} onSelect={handleSelect}>
                  {value === item.value && <Check className={"mr-2 h-4 w-4"} />}
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
