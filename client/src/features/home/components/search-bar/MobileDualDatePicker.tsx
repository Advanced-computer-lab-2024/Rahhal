import {
  format,
  isSameDay,
  startOfToday,
  addMonths,
  startOfMonth,
} from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DayPicker, DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { TimePicker12HSearchBar } from "./time-picker-12hour-search-bar";
import CircularSlider from "@fseehawer/react-circular-slider";

interface DualDatePickerMobileProps {
  title: string;
  leftPlaceholder: string;
  rightPlaceholder: string;
  leftDate?: Date;
  rightDate?: Date;
  onLeftDateChange: (date: Date | undefined) => void;
  onRightDateChange: (date: Date | undefined) => void;
  displayHours?: boolean;
}

export function DualDatePickerMobile({
  title,
  leftPlaceholder,
  rightPlaceholder,
  leftDate,
  rightDate,
  onLeftDateChange,
  onRightDateChange,
  displayHours,
}: DualDatePickerMobileProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeType, setActiveType] = useState(false); // false = dates, true = months
  const [sliderValue, setSliderValue] = useState(1);

  const handleDateChange = (range: DateRange | undefined) => {
    if (range) {
      onLeftDateChange(range.from);
      onRightDateChange(range.to);
    }
  };

  const handleClear = () => {
    onLeftDateChange(undefined);
    onRightDateChange(undefined);
  };

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    const today = startOfToday();
    const startingMonth =
      today.getDate() > 1
        ? startOfMonth(addMonths(today, 1))
        : startOfMonth(today);

    if (activeType) {
      onLeftDateChange(startingMonth);
      onRightDateChange(addMonths(startingMonth, value));
    }
  };

  const handleDateButton = () => {
    setActiveType(false);
  };

  const handleMonthButton = () => {
    setActiveType(true);
    const today = startOfToday();
    const startingMonth =
      today.getDate() > 1
        ? startOfMonth(addMonths(today, 1))
        : startOfMonth(today);
    onLeftDateChange(startingMonth);
    onRightDateChange(addMonths(startingMonth, sliderValue));
  };

  const getDisplayText = () => {
    if (!leftDate && !rightDate) {
      return "Add dates";
    }
    if (leftDate && rightDate) {
      if (activeType) {
        return `${format(leftDate, "MMM yyyy")} - ${format(rightDate, "MMM yyyy")}`;
      }
      return `${format(leftDate, "MMM d")} - ${format(rightDate, "MMM d")}`;
    }
    if (leftDate) {
      return format(leftDate, activeType ? "MMM yyyy" : "MMM d, yyyy");
    }
    return "Add dates";
  };

  if (showCalendar) {
    return (
      <div className="bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCalendar(false)}
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
          </Button>
          <h3 className="font-medium">{title}</h3>
          {(leftDate || rightDate) && (
            <Button variant="ghost" size="sm" onClick={handleClear}>
              Clear
            </Button>
          )}
        </div>

        {/* Date/Month Toggle */}
        <div className="p-4 flex justify-center">
          <div className="rounded-3xl w-48 h-12 flex p-1 bg-gray-100">
            <button
              className={cn(
                "flex justify-center items-center w-1/2 rounded-3xl text-sm font-medium transition-colors",
                !activeType ? "bg-white shadow-sm" : "hover:bg-gray-200"
              )}
              onClick={handleDateButton}
            >
              Dates
            </button>
            <button
              className={cn(
                "flex justify-center items-center w-1/2 rounded-3xl text-sm font-medium transition-colors",
                activeType ? "bg-white shadow-sm" : "hover:bg-gray-200"
              )}
              onClick={handleMonthButton}
            >
              Months
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-4">
          {activeType ? (
            /* Month Selector */
            <div className="flex flex-col items-center gap-8 py-8">
              <CircularSlider
                trackSize={15}
                progressSize={15}
                min={1}
                max={12}
                label={`month${sliderValue > 1 ? "s" : ""}`}
                labelBottom={true}
                labelColor={"black"}
                progressColorFrom={"#e1bc6d"}
                progressColorTo={"#f3dba2"}
                labelFontSize={"0.875rem"}
                knobColor={"white"}
                verticalOffset={"0rem"}
                useMouseAdditionalToTouch={true}
                valueFontSize={"3rem"}
                onChange={handleSliderChange}
                width={200}
                height={200}
              />
              {leftDate && rightDate && (
                <div className="text-center">
                  <div className="text-sm text-gray-600">Selected range</div>
                  <div className="font-medium">
                    {format(leftDate, "MMM yyyy")} -{" "}
                    {format(rightDate, "MMM yyyy")}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Date Picker */
            <div className="pb-4">
              <DayPicker
                mode="range"
                selected={{ from: leftDate, to: rightDate }}
                onSelect={handleDateChange}
                disabled={(date) => date < new Date()}
                numberOfMonths={1}
                className="w-full"
                classNames={{
                  day_button:
                    "h-10 w-10 p-0 font-normal aria-selected:opacity-100",
                  day_today: "bg-accent text-accent-foreground",
                  day_selected:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_range_middle:
                    "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_range_start: "day-range-start",
                  day_range_end: "day-range-end",
                  day_hidden: "invisible",
                }}
              />
            </div>
          )}

          {/* Time Pickers */}
          {displayHours && !activeType && (leftDate || rightDate) && (
            <div className="border-t border-gray-100 pt-4 space-y-4">
              {leftDate && (
                <div>
                  <div className="text-sm font-medium mb-2">
                    {leftPlaceholder} Time
                  </div>
                  <TimePicker12HSearchBar
                    setDate={onLeftDateChange}
                    date={leftDate}
                  />
                </div>
              )}
              {rightDate && (
                <div>
                  <div className="text-sm font-medium mb-2">
                    {rightPlaceholder} Time
                  </div>
                  <TimePicker12HSearchBar
                    setDate={onRightDateChange}
                    date={rightDate}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Done Button */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <Button
            onClick={() => setShowCalendar(false)}
            className="w-full h-12 bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)]"
          >
            Done
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => setShowCalendar(true)}
    >
      <div className="flex items-center flex-1">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
          <CalendarIcon className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <div className="font-medium text-gray-900">{title}</div>
          <div
            className={cn(
              "text-sm",
              leftDate || rightDate ? "text-gray-900" : "text-gray-500"
            )}
          >
            {getDisplayText()}
          </div>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </div>
  );
}
