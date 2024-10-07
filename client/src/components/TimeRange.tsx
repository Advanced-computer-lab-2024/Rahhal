import React, { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { TimePicker } from "@/components/ui/TimePicker";
import { Edit2, Save } from "lucide-react";
import { Card } from "./ui/card";

interface TimeRangeProps {
  initialCheckInTime?: Date;
  initialCheckOutTime?: Date;
  onSave?: (startTime: Date | undefined, endTime: Date | undefined) => void;
  labels: { startTimeLabel: string; endTimeLabel: string };
  isEditingInitially?: boolean;
}

const TimeRange: React.FC<TimeRangeProps> = ({
  initialCheckInTime,
  initialCheckOutTime,
  onSave,
  labels,
  isEditingInitially = false,
}) => {
  const defaultTime = new Date();
  defaultTime.setHours(0, 0, 0);

  const [checkInTime, setCheckInTime] = useState<Date>(initialCheckInTime || defaultTime);
  const [checkOutTime, setCheckOutTime] = useState<Date>(initialCheckOutTime || defaultTime);
  const [isEditingCheckIn, setIsEditingCheckIn] = useState(isEditingInitially);
  const [isEditingCheckOut, setIsEditingCheckOut] = useState(isEditingInitially);

  const handleEdit = (isCheckIn: boolean) => {
    isCheckIn ? setIsEditingCheckIn(true) : setIsEditingCheckOut(true);
  };

  const handleSave = (isCheckIn: boolean) => {
    isCheckIn ? setIsEditingCheckIn(false) : setIsEditingCheckOut(false);
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
    isCheckIn ? setCheckInTime(newTime) : setCheckOutTime(newTime);
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  const TimePickerBox = ({ isCheckIn }: { isCheckIn: boolean }) => {
    const time = isCheckIn ? checkInTime : checkOutTime;
    const isEditing = isCheckIn ? isEditingCheckIn : isEditingCheckOut;
    const title = isCheckIn ? labels.startTimeLabel : labels.endTimeLabel;

    return (
      <div
        className="border rounded-md p-4 transition-all duration-200 bg-transparent flex-1 mr-4 last:mr-0"
        onKeyDown={(e) => handleKeyDown(e, isCheckIn)}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm font-medium">{title}</div>
          <Button
            onClick={() => (isEditing ? handleSave(isCheckIn) : handleEdit(isCheckIn))}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            {isEditing ? <Save className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
          </Button>
        </div>
        <div className="w-full">
          {isEditing ? (
            <TimePicker
              date={time}
              onChange={(newTime) => handleTimeChange(newTime!, isCheckIn)}
              hourCycle={12}
              granularity="minute"
            />
          ) : (
            <div className="text-gray-500 h-10 flex items-center justify-center">
              {formatTime(time)}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="flex p-4">
      <TimePickerBox isCheckIn={true} />
      <TimePickerBox isCheckIn={false} />
    </Card>
  );
};

export default TimeRange;
