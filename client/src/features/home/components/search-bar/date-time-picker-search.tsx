import { add, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TimePicker12HSearchBar } from "./time-picker-12hour-search-bar";

interface DateTimePickerProps {
  date?: Date;
  placeholder: string;
  onDateChange: (date: Date | undefined) => void;
}

export function DateTimePickerSearchBar({ date, placeholder, onDateChange }: DateTimePickerProps) {
  /**
   * carry over the current time when a user clicks a new day
   * instead of resetting to 00:00
   */
  const handleSelect = (newDay: Date | undefined) => {
    if (!newDay) return;
    if (!date) {
      onDateChange(newDay);
      return;
    }
    const diff = newDay.getTime() - date.getTime();
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    const newDateFull = add(date, { days: Math.ceil(diffInDays) });
    onDateChange(newDateFull);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[200px] h-[66px] justify-start text-left font-normal rounded-full border-none"
        >
          <CalendarIcon className="mr-2 h-4 w-4 color: black" />
          <div className="flex flex-col">
            <span className="text-black text-sm">{placeholder}</span>
            <span className={date ? "text-black text-xs" : "text-gray-500 text-xs"}>
              {date ? format(date, "MMM d, hh:mm aa") : "Add dates"}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 rounded-[4%]">
        <Calendar mode="single" selected={date} onSelect={(d) => handleSelect(d)} initialFocus />
        <div className="p-3 border-t border-border flex justify-center items-center">
          <TimePicker12HSearchBar setDate={onDateChange} date={date} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
