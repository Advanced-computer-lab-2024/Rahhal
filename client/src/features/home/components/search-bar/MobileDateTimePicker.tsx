import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { TimePicker12HSearchBar } from "./time-picker-12hour-search-bar";

interface DateTimePickerMobileProps {
  title: string;
  placeholder: string;
  date?: Date;
  onDateChange: (date: Date | undefined) => void;
}

export function DateTimePickerMobile({
  title,
  placeholder,
  date,
  onDateChange,
}: DateTimePickerMobileProps) {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSelect = (newDay: Date | undefined) => {
    if (!newDay) return;

    if (!date) {
      onDateChange(newDay);
      return;
    }

    // Preserve time when selecting new date
    const newDateTime = new Date(newDay);
    newDateTime.setHours(date.getHours());
    newDateTime.setMinutes(date.getMinutes());
    onDateChange(newDateTime);
  };

  const handleClear = () => {
    onDateChange(undefined);
  };

  if (showCalendar) {
    return (
      <div className="bg-white">
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
          {date && (
            <Button variant="ghost" size="sm" onClick={handleClear}>
              Clear
            </Button>
          )}
        </div>

        {/* Calendar */}
        <div className="p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            className="rounded-md border"
            disabled={(date) => date < new Date()}
          />
        </div>

        {/* Time Picker */}
        {date && (
          <div className="p-4 border-t border-gray-100">
            <div className="text-sm font-medium mb-2">Time</div>
            <TimePicker12HSearchBar setDate={onDateChange} date={date} />
          </div>
        )}

        {/* Done Button */}
        <div className="p-4 border-t border-gray-100">
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
            className={cn("text-sm", date ? "text-gray-900" : "text-gray-500")}
          >
            {date ? format(date, "MMM d, yyyy 'at' hh:mm aa") : placeholder}
          </div>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </div>
  );
}
