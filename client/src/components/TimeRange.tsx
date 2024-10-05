import React, { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { TimePicker } from "@/components/ui/TimePicker";
import { Edit2, Save } from "lucide-react";

interface TimeRangeProps {
  initialCheckInTime?: Date;
  initialCheckOutTime?: Date;
  onSave?: (checkInTime: Date | undefined, checkOutTime: Date | undefined) => void;
}

const TimeRange: React.FC<TimeRangeProps> = ({
  initialCheckInTime,
  initialCheckOutTime,
  onSave,
}) => {
  const defaultTime = new Date();
  defaultTime.setHours(0, 0, 0); 

  const [checkInTime, setCheckInTime] = useState<Date>(initialCheckInTime || defaultTime);
  const [checkOutTime, setCheckOutTime] = useState<Date>(initialCheckOutTime || defaultTime);
  const [isEditingCheckIn, setIsEditingCheckIn] = useState(false);
  const [isEditingCheckOut, setIsEditingCheckOut] = useState(false);

  const handleEdit = (isCheckIn: boolean) => {
    if (isCheckIn) {
      setIsEditingCheckIn(true);
    } else {
      setIsEditingCheckOut(true);
    }
  };

  const handleSave = (isCheckIn: boolean) => {
    if (isCheckIn) {
      setIsEditingCheckIn(false);
    } else {
      setIsEditingCheckOut(false);
    }
    if (onSave) {
      onSave(checkInTime, checkOutTime);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, isCheckIn: boolean) => {
    if (e.key === "Enter") {
      handleSave(isCheckIn);
    }
  };

  const handleTimeChange = (newTime: Date, isCheckIn: boolean) => {
    if (isCheckIn) {
      setCheckInTime(newTime);
    } else {
      setCheckOutTime(newTime);
    }
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  return (
    <div className={`space-y-4 p-4 rounded-lg transition-all duration-200 bg-white shadow-md`}>
      {}
      <div
        className={`border rounded-md p-2 transition-all duration-200 bg-transparent`}
        onKeyDown={(e) => handleKeyDown(e, true)}
        style={{ minHeight: "100px", width: "500px" }} 
      >
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium">Check-in</div>
          <Button
            onClick={() => (isEditingCheckIn ? handleSave(true) : handleEdit(true))}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            {isEditingCheckIn ? <Save className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
          </Button>
        </div>
        {}
        <div style={{ width: "100%" }}>
          {isEditingCheckIn ? (
            <TimePicker
              date={checkInTime}
              onChange={(newTime) => handleTimeChange(newTime!, true)} 
              hourCycle={12}
              granularity="minute"
            />
          ) : (
            <div className="text-gray-500 min-h-[40px] flex items-center justify-center">
              {formatTime(checkInTime)} {}
            </div>
          )}
        </div>
      </div>

      {}
      <div
        className={`border rounded-md p-2 transition-all duration-200 bg-transparent`}
        onKeyDown={(e) => handleKeyDown(e, false)}
        style={{ minHeight: "100px", width: "500px" }}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium">Check-out</div>
          <Button
            onClick={() => (isEditingCheckOut ? handleSave(false) : handleEdit(false))}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            {isEditingCheckOut ? <Save className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
          </Button>
        </div>
        {}
        <div style={{ width: "100%" }}>
          {isEditingCheckOut ? (
            <TimePicker
              date={checkOutTime}
              onChange={(newTime) => handleTimeChange(newTime!, false)} 
              hourCycle={12}
              granularity="minute"
            />
          ) : (
            <div className="text-gray-500 min-h-[40px] flex items-center justify-center">
              {formatTime(checkOutTime)} {}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeRange;
