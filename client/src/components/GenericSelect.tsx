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
  initialValue?: string;
  width?: string;
}

export function GenericSelect({
  label,
  placeholder,
  options,
  onSelect,
  initialValue,
  width = "w-full",
}: GenericSelectProps) {
  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(initialValue);

  // Update both the local state and notify the parent component
  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <Select value={selectedValue} onValueChange={handleValueChange}>
      <SelectTrigger className={width}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              onClick={() => setSelectedValue(option.value)}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
