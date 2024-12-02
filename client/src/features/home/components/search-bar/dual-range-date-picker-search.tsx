import { add, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TimePicker12HSearchBar } from "./time-picker-12hour-search-bar";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
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
  popoverRef: React.RefObject<HTMLDivElement>;
}

export function DualDatePickerSearchBar({
  date,
  placeholder,
  onDateChange,
  index,
  setFocusIndex,
  focusIndex,
  setHoverIndex,
  hoverIndex,
  corner,
  popoverRef
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const leftIndex = index || 0;
  const rightIndex = leftIndex + 1;
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
  

  useEffect(() => {
    console.log(open);
  }, [open]);
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDateChange(undefined);
  };

  useEffect(() => {
    if ((focusIndex === leftIndex || focusIndex === rightIndex) && open === false)
      setOpen(true);
    if(focusIndex != leftIndex && focusIndex != rightIndex && open === true)
      setOpen(false);

  }, [focusIndex]);

  const handleBlur = () => {
    if(focusIndex != leftIndex && focusIndex != rightIndex)
      setOpen(false);
  };
  return (
    <>
      <div
        className={cn(
          " flex items-center px-0",
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
       
          <div className="flex">
            <div
              className={cn(
                "rounded-full focus-within:bg-background focus-within:shadow-sm h-[66px] flex items-center",
                focusIndex != leftIndex
                  ? hoverIndex == leftIndex && (leftIndex == focusIndex! - 1 || leftIndex == focusIndex! + 1)
                    ? ""
                    : "hover:bg-gray-300/65"
                  : focusIndex === leftIndex
                    ? "bg-background shadow-[0_0_12px_0_rgba(0,0,0,0.16)]"
                    : "",
              )}
            >
              <Button
                variant="outline"
                className={cn(
                  "border-0 focus-visible:outline-0 focus-visible:ring-transparent focus-visible:ring-offset-transparent bg-transparent hover:bg-transparent flex justify-start items-center px-2 w-40 py-0 relative",
                  "w-[200px] h-[66px] justify-start text-left font-normal rounded-full border-none ",
                )}
                onMouseEnter={() => setHoverIndex && setHoverIndex(index || 0)}
                onMouseLeave={() => setHoverIndex && setHoverIndex(0)}
                onClick={() => {
                  if (focusIndex !== leftIndex) {
                    setFocusIndex && setFocusIndex(leftIndex!);
                  }
                }}
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
            </div>
            <div
              className={cn(
                "rounded-full focus-within:bg-background focus-within:shadow-sm h-[66px] flex items-center",
                focusIndex != rightIndex
                  ? hoverIndex == rightIndex && (rightIndex == focusIndex! - 1 || rightIndex == focusIndex! + 1)
                    ? ""
                    : "hover:bg-gray-300/65"
                  : focusIndex === rightIndex! + 1
                    ? "bg-background shadow-[0_0_12px_0_rgba(0,0,0,0.16)]"
                    : "",
              )}
            >
              <Button
                variant="outline"
                className={cn(
                  "border-0 focus-visible:outline-0 focus-visible:ring-transparent focus-visible:ring-offset-transparent bg-transparent hover:bg-transparent flex justify-start items-center px-2 w-40 py-0 relative",
                  "w-[200px] h-[66px] justify-start text-left font-normal rounded-full border-none ",
                )}
                onMouseEnter={() => setHoverIndex && setHoverIndex((index || 0) + 1)}
                onMouseLeave={() => setHoverIndex && setHoverIndex(0)}
                onClick={() => {
                  if (focusIndex !== rightIndex) {
                    setFocusIndex && setFocusIndex(rightIndex!);
                  }
                }}
              >
                <CalendarIcon className="mr-2 h-4 w-4 color: black" />
                <div className="flex flex-col">
                  <span className="text-black text-sm">{"JUSTTTT"}</span>
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
            </div>
          
          </div>
          {open &&
            <div className="absolute w-5/12 h-3/6 rounded-2xl bg-red-900 top-40 z-20 left-1/2 transform -translate-x-1/2" ref={popoverRef} tabIndex={0} onFocus={() => console.log("GainedFocus")} onBlur={handleBlur}>
            </div>
          }
      </div>
    </>
  );
}
