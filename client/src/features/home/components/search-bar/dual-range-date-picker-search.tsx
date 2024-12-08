import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  add,
  addDays,
  format,
  isSameMonth,
  isSameDay,
  startOfToday,
  differenceInDays,
} from "date-fns";
import { DateRange } from "react-day-picker";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { set } from "lodash";
import { on } from "events";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DateTimePickerProps {
  leftDate?: Date;
  leftPlaceholder: string;
  onLeftDateChange: (date: Date | undefined) => void;
  rightDate?: Date;
  rightPlaceholder: string;
  onRightDateChange: (date: Date | undefined) => void;
  index?: number;
  setFocusIndex?: (focusIndex: number) => void;
  focusIndex?: number;
  setHoverIndex?: (hoverIndex: number) => void;
  hoverIndex?: number;
  corner?: number;
  popoverRef: React.RefObject<HTMLDivElement>;
}

export function DualDatePickerSearchBar({
  leftDate,
  leftPlaceholder,
  onLeftDateChange,
  rightDate,
  rightPlaceholder,
  onRightDateChange,
  index,
  setFocusIndex,
  focusIndex,
  setHoverIndex,
  hoverIndex,
  corner,
  popoverRef,
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState<Date | undefined>();
  const [to, setTo] = useState<Date | undefined>();
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [activeButton, setActiveButton] = useState<"checkIn" | "checkOut">("checkIn");
  const leftButtonRef = useRef<HTMLButtonElement>(null);
  const rightButtonRef = useRef<HTMLButtonElement>(null);
  const leftIndex = index || 0;
  const rightIndex = leftIndex + 1;
  console.log("leftIndex", leftIndex);
  console.log("rightIndex", rightIndex);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (activeButton === "checkIn" && selectedDate) {
      if (to && to < (selectedDate || isSameDay(to, selectedDate))){ setTo(undefined); onRightDateChange(undefined); }
      setFrom(selectedDate);
      onLeftDateChange(selectedDate);
      setCheckIn(selectedDate);
      setActiveButton("checkOut");
      setFocusIndex && setFocusIndex(rightIndex);
    } else if (activeButton === "checkOut" && selectedDate) {
      setTo(selectedDate);
      onRightDateChange(selectedDate);
      setCheckOut(selectedDate);
      if (!from) {
        setActiveButton("checkIn");
        setFocusIndex && setFocusIndex(leftIndex);
      } else {
        setFocusIndex && setFocusIndex(rightIndex);
      }
    }
  };

  const handleDateChange = (date: DateRange | undefined) => {
    if (date) {
      setFrom(date.from);
      setTo(date.to);
      setCheckIn(date.from);
      setCheckOut(date.to);
    }
  };

  const handleLeftClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLeftDateChange(undefined);
    setFrom(undefined);
  };
  const handleRightClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRightDateChange(undefined);
    setTo(undefined);
  };

  useEffect(() => {
    if ((focusIndex === leftIndex || focusIndex === rightIndex) && open === false) setOpen(true);
    if (focusIndex != leftIndex && focusIndex != rightIndex && open === true) setOpen(false);
  }, [focusIndex]);

  const handleBlur = () => {
    if (focusIndex != leftIndex && focusIndex != rightIndex) setOpen(false);
  };
  return (
    <>
      <div
        className={cn(
          " flex items-center px-0",
          focusIndex === 1 && hoverIndex === 2
            ? leftIndex === 1
              ? "bg-gray-300/65"
              : leftIndex === 2
                ? "bg-gray-300/65 rounded-r-full"
                : ""
            : focusIndex === corner && hoverIndex === (corner ? corner - 1 : 0 - 1)
              ? leftIndex === corner
                ? "bg-gray-300/65"
                : leftIndex === (corner ? corner - 1 : 0 - 1)
                  ? "bg-gray-300/65 rounded-l-full"
                  : ""
              : focusIndex != 0 &&
                  focusIndex != 1 &&
                  focusIndex != corner &&
                  (hoverIndex ? hoverIndex : 0) - 1 === focusIndex
                ? leftIndex === hoverIndex
                  ? "bg-gray-300/65 rounded-r-full"
                  : leftIndex === focusIndex
                    ? "bg-gray-300/65 rounded-l-full"
                    : ""
                : focusIndex != 0 &&
                    focusIndex != 1 &&
                    focusIndex != corner &&
                    (hoverIndex ? hoverIndex : 0) + 1 === focusIndex
                  ? leftIndex === hoverIndex
                    ? "bg-gray-300/65 rounded-l-full"
                    : leftIndex === focusIndex
                      ? "bg-gray-300/65 rounded-r-full"
                      : ""
                  : "",
        )}
      >
          <div
            className={cn(
              "rounded-full focus-within:bg-background focus-within:shadow-sm h-[66px] flex items-center",
              focusIndex != leftIndex
                ? hoverIndex == leftIndex &&
                  (leftIndex == focusIndex! - 1 || leftIndex == focusIndex! + 1)
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
              onMouseEnter={() => setHoverIndex && setHoverIndex(leftIndex || 0)}
              onMouseLeave={() => setHoverIndex && setHoverIndex(0)}
              onClick={() => {
                leftButtonRef.current?.blur();
                if (focusIndex !== leftIndex) {
                  setFocusIndex && setFocusIndex(leftIndex!);
                  setActiveButton("checkIn");
                }
                else if (focusIndex === leftIndex) {
                  setFocusIndex && setFocusIndex(0);
                }
              }}
              ref={leftButtonRef}
            >
              <CalendarIcon className="mr-2 h-4 w-4 color: black" />
              <div className="flex flex-col">
                <span className="text-black text-sm">{leftPlaceholder}</span>
                <span className={leftDate ? "text-black text-xs" : "text-gray-500 text-xs"}>
                  {leftDate ? format(leftDate, "MMM d, hh:mm aa") : "Add dates"}
                </span>
              </div>
              {leftDate && open && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black rounded-md hover:rounded-full text-lg transition-all duration-300 hover:bg-gray-300 w-6 h-6 flex items-center justify-center"
                  onClick={handleLeftClear}
                  aria-label="Clear date"
                >
                  <IoCloseOutline />
                </Button>
              )}
            </Button>
        </div>
              </div>
        <div
        className={cn(
          " flex items-center px-0",
          focusIndex === 1 && hoverIndex === 2
            ? rightIndex === 1
              ? "bg-gray-300/65"
              : rightIndex === 2
                ? "bg-gray-300/65 rounded-r-full"
                : ""
            : focusIndex === corner && hoverIndex === (corner ? corner - 1 : 0 - 1)
              ? rightIndex === corner
                ? "bg-gray-300/65"
                : rightIndex === (corner ? corner - 1 : 0 - 1)
                  ? "bg-gray-300/65 rounded-l-full"
                  : ""
              : focusIndex != 0 &&
                  focusIndex != 1 &&
                  focusIndex != corner &&
                  (hoverIndex ? hoverIndex : 0) - 1 === focusIndex
                ? rightIndex === hoverIndex
                  ? "bg-gray-300/65 rounded-r-full"
                  : rightIndex === focusIndex
                    ? "bg-gray-300/65 rounded-l-full"
                    : ""
                : focusIndex != 0 &&
                    focusIndex != 1 &&
                    focusIndex != corner &&
                    (hoverIndex ? hoverIndex : 0) + 1 === focusIndex
                  ? rightIndex === hoverIndex
                    ? "bg-gray-300/65 rounded-l-full"
                    : rightIndex === focusIndex
                      ? "bg-gray-300/65 rounded-r-full"
                      : ""
                  : "",
        )}
      >
          <div
            className={cn(
              "rounded-full focus-within:bg-background focus-within:shadow-sm h-[66px] flex items-center",
              focusIndex != rightIndex
                ? hoverIndex == rightIndex &&
                  (rightIndex == focusIndex! - 1 || rightIndex == focusIndex! + 1)
                  ? ""
                  : "hover:bg-gray-300/65"
                : focusIndex === rightIndex
                  ? "bg-background shadow-[0_0_12px_0_rgba(0,0,0,0.16)]"
                  : "",
            )}
          >
              <button
                className={cn(
                  "border-0 focus:outline-none focus:ring-0 focus-visible:outline-0 focus-visible:ring-transparent focus-visible:ring-offset-transparent bg-transparent hover:bg-transparent flex justify-start items-center px-2 w-40 py-0 relative",
                  "w-[200px] h-[66px] justify-start text-left font-normal rounded-full border-none ",
                )}
                onMouseEnter={() => setHoverIndex && setHoverIndex(rightIndex || 0)}
                onMouseLeave={() => setHoverIndex && setHoverIndex(0)}
                onClick={() => {
                  rightButtonRef.current?.blur();
                  if (focusIndex !== rightIndex) {
                    setFocusIndex && setFocusIndex(rightIndex!);
                    setActiveButton("checkOut");
                  }
                  else if (focusIndex === rightIndex) {
                    setFocusIndex && setFocusIndex(0);
                  }
                }}
                ref={rightButtonRef}
              >
                <CalendarIcon className="mr-2 h-4 w-4 color: black" />
                <div className="flex flex-col">
                  <span className="text-black text-sm">{rightPlaceholder}</span>
                  <span className={rightDate ? "text-black text-xs" : "text-gray-500 text-xs"}>
                    {rightDate ? format(rightDate, "MMM d, hh:mm aa") : "Add dates"}
                  </span>
                </div>
                {rightDate && open && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black rounded-md hover:rounded-full text-lg transition-all duration-300 hover:bg-gray-300 w-6 h-6 flex items-center justify-center"
                    onClick={handleRightClear}
                    aria-label="Clear date"
                  >
                    <IoCloseOutline />
                  </Button>
                )}
              </button>
            </div>
        </div>
        {open && (
          <div
            className="absolute w-2/5 h-[50%] rounded-[2rem] bg-white top-40 z-20 left-1/2 transform -translate-x-1/2 shadow-[0_0_12px_0_rgba(0,0,0,0.16)] flex justify-center items-center"
            ref={popoverRef}
            tabIndex={0}
            onFocus={() => console.log("GainedFocus")}
            onBlur={handleBlur}
          >
            <Calendar
              style={{ display: 'flex', gap: '200px' }} 
              classNames={{ row: "flex w-full m-1.5 ",caption_label:"text-lg font-md" }}
              initialFocus
              mode="range"
              defaultMonth={from}
              disabled={(date) => date < new Date()}
              selected={{ from, to }}
              onSelect={handleDateChange}
              numberOfMonths={2}
              components={{
                Day: ({ date: dayDate, ...props }) => {
                  if (!isSameMonth(dayDate, props.displayMonth)) {
                    return <div className="w-9 h-9" />;
                  }
                  let isSelected = false;
                  let isBefore = false;
                  let isRange = false;

                  const isFrom = isSameDay(from, dayDate);
                  const isTo = isSameDay(to, dayDate);
                  isSelected = isFrom || isTo;
                  isBefore = dayDate < from;
                  isRange = from < dayDate && to > dayDate;

                  return (
                    <div className={cn("flex justify-center items-center")}>
                      <div
                        className={cn(
                          "absolute top-0 left-0 w-1/2 h-9 ",
                          isRange || (isTo && from) ? "bg-accent" : "",
                        )}
                      />

                      <div
                        className={cn(
                          "absolute top-0 right-0 w-1/2 h-9 ",
                          isRange || (isFrom && to) ? "bg-accent" : "",
                        )}
                      />

                      <button
                        className={cn(
                          "text-black font-normal w-9 h-9 rounded-full relative z-10 hover:bg-white hover:border hover:border-black",
                          isSelected ? " bg-black text-white hover:bg-black" : "",
                          activeButton == "checkOut" && isBefore
                            ? "hover:border-transparent text-gray-400 line-through "
                            : "",
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDateSelect(dayDate);
                        }}
                        disabled={activeButton == "checkOut" && (isBefore || isFrom)}
                      >
                        {format(dayDate, "d")}
                      </button>
                    </div>
                  );
                },
                IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
                IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
                Head: ({ ...props }) => (
                  <thead {...props}>
                    <tr className="flex">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                        <th key={day} className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] m-1.5">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                ),
              }} />
          </div>
        )}
    </>
  );
}
