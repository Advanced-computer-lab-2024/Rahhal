import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GenericSelectProps {
  label: string;
  placeholder: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
  initalValue?: string;
}

export function GenericSelect({ label, placeholder, options, onSelect }: GenericSelectProps) {
  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(undefined);

  return (
    <Select onSelect={(e) => onSelect(e)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              selected={selectedValue === option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
