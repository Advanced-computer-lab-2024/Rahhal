import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DayPicker } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  add,
  addDays,
  format,
  isSameMonth,
  isSameDay,
  startOfToday,
  differenceInDays,
  addMonths,
  startOfMonth,
} from "date-fns";
import { DateRange } from "react-day-picker";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { set } from "lodash";
import { on } from "events";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CircularSlider from "@fseehawer/react-circular-slider";
import { TimePicker12HSearchBar } from "@/features/home/components/search-bar/time-picker-12hour-search-bar.tsx";

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
  hour?: boolean;
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
  hour,
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState<Date | undefined>();
  const [to, setTo] = useState<Date | undefined>();
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [activeType, setActiveType] = useState<Boolean>(false);
  const [activeButton, setActiveButton] = useState<"checkIn" | "checkOut">("checkIn");
  const [sliderValue, setSliderValue] = useState<number>(1);
  const leftButtonRef = useRef<HTMLButtonElement>(null);
  const rightButtonRef = useRef<HTMLButtonElement>(null);
  const leftIndex = index || 0;
  const rightIndex = leftIndex + 1;
  console.log("leftIndex", leftIndex);
  console.log("rightIndex", rightIndex);
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (activeButton === "checkIn" && selectedDate) {
      if (to && to < (selectedDate || isSameDay(to, selectedDate))) {
        setTo(undefined);
        onRightDateChange(undefined);
      }
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

  const handleSliderChange = (value: number) => {
    if (value) {
      setSliderValue(value);
      const today = startOfToday();
      let startingMonth;
      if (today.getDate() > 1) {
        startingMonth = startOfMonth(addMonths(today, 1));
      } else {
        startingMonth = startOfMonth(today);
      }
      if (activeType) {
        onLeftDateChange(startingMonth);
        onRightDateChange(addMonths(startingMonth, value));
      }
    }
  };

  const handleDateButton = () => {
    setActiveType(false);
    onLeftDateChange(from);
    onRightDateChange(to);
  };
  const handleMonthButton = () => {
    setActiveType(true);
    const today = startOfToday();
    let startingMonth;
    if (today.getDate() > 1) {
      startingMonth = startOfMonth(addMonths(today, 1));
    } else {
      startingMonth = startOfMonth(today);
    }
    onLeftDateChange(startingMonth);
    onRightDateChange(addMonths(startingMonth, sliderValue));
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
              } else if (focusIndex === leftIndex) {
                setFocusIndex && setFocusIndex(0);
              }
            }}
            ref={leftButtonRef}
          >
            <CalendarIcon className="mr-2 h-4 w-4 color: black" />
            <div className="flex flex-col">
              <span className="text-black text-sm">{leftPlaceholder}</span>
              <span className={leftDate ? "text-black text-xs" : "text-gray-500 text-xs"}>
                {leftDate
                  ? !activeType
                    ? format(leftDate, "MMM d, hh:mm aa")
                    : format(leftDate, "MMM dd, yyyy")
                  : "Add dates"}
              </span>
            </div>
            {leftDate && open && !activeType && (
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
      {focusIndex == 0 && (
        <div className="relative">
          <div className="border-l border-gray-300 h-8" />{" "}
        </div>
      )}
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
              } else if (focusIndex === rightIndex) {
                setFocusIndex && setFocusIndex(0);
              }
            }}
            ref={rightButtonRef}
          >
            <CalendarIcon className="mr-2 h-4 w-4 color: black" />
            <div className="flex flex-col">
              <span className="text-black text-sm">{rightPlaceholder}</span>
              <span className={rightDate ? "text-black text-xs" : "text-gray-500 text-xs"}>
                {rightDate
                  ? !activeType
                    ? format(rightDate, "MMM d, hh:mm aa")
                    : format(rightDate, "MMM dd, yyyy")
                  : "Add dates"}
              </span>
            </div>
            {rightDate && open && !activeType && (
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
          className="absolute w-2/5 h-[55%] rounded-[2rem] bg-white top-40 z-20 left-1/2 transform -translate-x-1/2 shadow-[0_0_12px_0_rgba(0,0,0,0.16)] flex justify-center items-center"
          ref={popoverRef}
          tabIndex={0}
          onFocus={() => console.log("GainedFocus")}
          onBlur={handleBlur}
        >
          <div
            className={cn("flex flex-col w-full h-full p-6", activeType || !hour ? "gap-10" : "")}
          >
            <div className={"flex w-full justify-center"}>
              <div className="rounded-3xl w-1/3 h-12 flex p-1 bg-gray-300/65">
                <button
                  className={cn(
                    "flex justify-center items-center w-1/2 rounded-3xl hover:bg-gray-300/65 text-md font-medium",
                    activeType ? "" : "bg-white hover:bg-white border border-gray-300",
                  )}
                  onClick={handleDateButton}
                >
                  Dates
                </button>
                <button
                  className={cn(
                    "flex justify-center items-center w-1/2 rounded-3xl hover:bg-gray-300/65 text-md font-medium rounded-",
                    activeType ? "bg-white hover:bg-white border border-gray-300" : "",
                  )}
                  onClick={handleMonthButton}
                >
                  Months
                </button>
              </div>
            </div>
            <div
              style={{ display: activeType ? "flex" : "none" }}
              className="flex-col w-full justify-center gap-8 items-center"
            >
              <CircularSlider
                trackSize={30}
                progressSize={30}
                min={1}
                max={12}
                label={`month${sliderValue > 1 ? "s" : ""}`}
                labelBottom={true}
                labelColor={"black"}
                progressColorFrom={"#e1bc6d"}
                progressColorTo={"#f3dba2"}
                labelFontSize={"1rem"}
                knobColor={"white"}
                verticalOffset={"0rem"}
                useMouseAdditionalToTouch={true}
                valueFontSize={"5rem"}
                onChange={(value: number) => {
                  handleSliderChange(value);
                }}
              />
              {leftDate && rightDate && (
                <div className="flex gap-2">
                  <span className={"font-medium"}>{format(leftDate!, "MMM dd, yyyy")}</span>
                  <span>{" to "}</span>
                  <span className={"font-medium"}>{format(rightDate!, "MMM dd, yyyy")}</span>
                </div>
              )}
            </div>

            <div
              style={{ display: !activeType ? "flex" : "none" }}
              className="w-full justify-center"
            >
              <Calendar
                classNames={{
                  head_row: "flex w-full",
                  head_cell: "text-muted-foreground rounded-md w-11 font-normal text-[0.8rem]",
                  row: "flex w-full mt-0.5 ",
                  caption_label: "text-lg font-md",
                  nav_button_previous: "absolute left-1 border-none rounded-[999px]",
                  nav_button_next: "absolute right-1 border-none rounded-[999px]",
                  cell: "h-11 w-fit text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                }}
                className={"flex w-full"}
                startMonth={new Date()}
                mode="range"
                defaultMonth={from}
                disabled={(date) => date < new Date()}
                selected={{ from, to }}
                onSelect={handleDateChange}
                numberOfMonths={2}
                components={{
                  Day: ({ date: dayDate, ...props }) => {
                    if (!isSameMonth(dayDate, props.displayMonth)) {
                      return <div className="w-11 h-11" />;
                    }
                    let isSelected = false;
                    let isBefore = false;
                    let isRange = false;

                    const isFrom = isSameDay(from, dayDate);
                    const isTo = isSameDay(to, dayDate);
                    isSelected = isFrom || isTo;
                    isBefore = dayDate < from;
                    isRange = from < dayDate && to > dayDate;
                    const isBeforeToday = dayDate < startOfToday();

                    return (
                      <div className={cn("flex justify-center items-center w-11")}>
                        <div
                          className={cn(
                            "absolute top-0 left-0 w-1/2 h-11",
                            isRange || (isTo && from) ? "bg-accent" : "",
                          )}
                        />

                        <div
                          className={cn(
                            "absolute top-0 right-0 w-1/2 h-11",
                            isRange || (isFrom && to) ? "bg-accent" : "",
                          )}
                        />

                        <button
                          className={cn(
                            "text-black text-xs font-medium w-11 h-11 flex justify-center items-center rounded-full relative z-10 hover:bg-white hover:border hover:border-black",
                            isSelected ? " bg-black text-white hover:bg-black" : "",
                            (activeButton == "checkOut" && isBefore) || isBeforeToday
                              ? "hover:border-transparent text-gray-400"
                              : "",
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDateSelect(dayDate);
                          }}
                          disabled={
                            (activeButton == "checkOut" && (isBefore || isFrom)) || isBeforeToday
                          }
                        >
                          {format(dayDate, "d")}
                        </button>
                      </div>
                    );
                  },
                  IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
                  IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
                  Months: ({ ...props }) => {
                    console.log(props.children);
                    return (
                      <div className={"flex justify-between p-4 w-full h-full"}>
                        {" "}
                        {props.children}
                      </div>
                    );
                  },
                }}
              />
            </div>
            {hour && !activeType && (
              <div className="px-16 flex justify-between items-center">
                <TimePicker12HSearchBar
                  setDate={onLeftDateChange}
                  date={leftDate}
                  disabled={!leftDate}
                />
                <TimePicker12HSearchBar
                  setDate={onRightDateChange}
                  date={rightDate}
                  disabled={!rightDate}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
