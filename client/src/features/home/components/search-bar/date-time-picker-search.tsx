import { add, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TimePicker12HSearchBar } from "./time-picker-12hour-search-bar";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface DateTimePickerProps {
  date?: Date;
  placeholder: string;
  onDateChange: (date: Date | undefined) => void;
  index?: number;
  setFocusIndex?: (focusIndex: number) => void;
  focusIndex?: number;
  setHoverIndex?: (hoverIndex: number) => void;
  hoverIndex?: number;
  corner?: number;
}

export function DateTimePickerSearchBar({
  date,
  placeholder,
  onDateChange,
  index,
  setFocusIndex,
  focusIndex,
  setHoverIndex,
  hoverIndex,
  corner,
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
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
  if (!open && focusIndex === index && setFocusIndex) {
    setFocusIndex(0); // Reset focus when the popover closes
  } else if (open && focusIndex !== index && setFocusIndex) {
    setFocusIndex(index ? index : 0); // Set focus when the popover opens
  }
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDateChange(undefined);
  };
  return (
    <>
      <div
        className={cn(
          " flex items-center px-0 relative",
          focusIndex === 1 && hoverIndex === 2
            ? index === 1
              ? "bg-gray-300/65"
              : index === 2
                ? "bg-gray-300/65 rounded-r-full"
                : ""
            : focusIndex === corner && hoverIndex === (corner ? corner - 1 : 0 - 1)
              ? index === corner
                ? "bg-gray-300/65"
                : index === (corner ? corner - 1 : 0 - 1)
                  ? "bg-gray-300/65 rounded-l-full"
                  : ""
              : focusIndex != 0 &&
                  focusIndex != 1 &&
                  focusIndex != corner &&
                  (hoverIndex ? hoverIndex : 0) - 1 === focusIndex
                ? index === hoverIndex
                  ? "bg-gray-300/65 rounded-r-full"
                  : index === focusIndex
                    ? "bg-gray-300/65 rounded-l-full"
                    : ""
                : focusIndex != 0 &&
                    focusIndex != 1 &&
                    focusIndex != corner &&
                    (hoverIndex ? hoverIndex : 0) + 1 === focusIndex
                  ? index === hoverIndex
                    ? "bg-gray-300/65 rounded-l-full"
                    : index === focusIndex
                      ? "bg-gray-300/65 rounded-r-full"
                      : ""
                  : "",
        )}
      >
        <div
          className={cn(
            "rounded-full focus-within:bg-background focus-within:shadow-sm h-[66px] flex items-center relative",
            focusIndex != index
              ? hoverIndex == index && (index == focusIndex! - 1 || index == focusIndex! + 1)
                ? ""
                : "hover:bg-gray-300/65 z-0"
              : focusIndex === index
                ? "bg-background z-10 relative shadow-[rgba(0,_0,_0,_0.15)_0px_0px_16px]"
                : "",
          )}
        >
          <Popover
            open={open}
            onOpenChange={(isOpen) => {
              setOpen(isOpen); // Let the Popover handle its open/close state
            }}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "border-0 focus-visible:outline-0 focus-visible:ring-transparent focus-visible:ring-offset-transparent bg-transparent hover:bg-transparent flex justify-start items-center px-2 w-40 py-0 relative",
                  "w-[200px] h-[66px] justify-start text-left font-normal rounded-full border-none ",
                )}
                onMouseEnter={() => setHoverIndex && setHoverIndex(index || 0)}
                onMouseLeave={() => setHoverIndex && setHoverIndex(0)}
              >
                <CalendarIcon className="mr-2 h-4 w-4 color: black" />
                <div className="flex flex-col">
                  <span className="text-black text-sm">{placeholder}</span>
                  <span className={date ? "text-black text-xs" : "text-gray-500 text-xs"}>
                    {date ? format(date, "MMM d, hh:mm aa") : "Add dates"}
                  </span>
                </div>
                {date && open && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black rounded-md hover:rounded-full text-lg transition-all duration-300 hover:bg-gray-300 w-6 h-6 flex items-center justify-center"
                    onClick={handleClear}
                    aria-label="Clear date"
                  >
                    <IoCloseOutline />
                  </Button>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 rounded-[4%]">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => handleSelect(d)}
                initialFocus
              />
              <div className="p-3 border-t border-border flex justify-center items-center">
                <TimePicker12HSearchBar setDate={onDateChange} date={date} />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
}
