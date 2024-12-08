import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrashIcon } from "lucide-react";

interface DateTimeEntry {
  Date: Date;
  Time: Date;
}

interface ItineraryAvailableDatesAndTimesEditProps {
  availableDatesTime: DateTimeEntry[];
  addTrigger: boolean;
  triggerClenup: () => void;
  onSave: (newDatesTime: DateTimeEntry[]) => void;
}

const ItineraryAvailableDatesAndTimesEdit: React.FC<ItineraryAvailableDatesAndTimesEditProps> = ({
  availableDatesTime,
  addTrigger,
  triggerClenup,
  onSave,
}) => {
  const [editedDatesTime, setEditedDatesTime] = useState<DateTimeEntry[]>(() =>
    availableDatesTime.map((entry) => ({
      Date: new Date(entry.Date),
      Time: new Date(entry.Time),
    })),
  );

  useEffect(() => {
    if (addTrigger) {
      setEditedDatesTime([...editedDatesTime, { Date: new Date(), Time: new Date() }]);
      onSave([...editedDatesTime, { Date: new Date(), Time: new Date() }]);
    }
    return triggerClenup;
  }, [addTrigger]);

  const handleDateChange = (index: number, newDate: string) => {
    const updatedDatesTime = [...editedDatesTime];
    updatedDatesTime[index] = {
      ...updatedDatesTime[index],
      Date: new Date(newDate),
      Time: new Date(updatedDatesTime[index].Time),
    };
    setEditedDatesTime(updatedDatesTime);
    onSave(updatedDatesTime);
  };

  const handleTimeChange = (index: number, newTime: string) => {
    const updatedDatesTime = [...editedDatesTime];
    const [hours, minutes] = newTime.split(":");
    const newDateTime = new Date(updatedDatesTime[index].Date);
    newDateTime.setHours(parseInt(hours), parseInt(minutes));
    updatedDatesTime[index] = { ...updatedDatesTime[index], Time: newDateTime };
    setEditedDatesTime(updatedDatesTime);
    onSave(updatedDatesTime);
  };

  const handleRemoveEntry = (index: number) => {
    const updatedDatesTime = editedDatesTime.filter((_, i) => i !== index);
    setEditedDatesTime(updatedDatesTime);
    onSave(updatedDatesTime);
  };

  return (
    <div>
      {editedDatesTime.map((entry, index) => (
        <div key={index} className="flex space-x-2 mb-2">
          <Input
            type="date"
            value={entry.Date.toISOString().split("T")[0]}
            onChange={(e) => {
              handleDateChange(index, e.target.value);
            }}
          />
          <Input
            type="time"
            value={entry.Time.toISOString().split("T")[1].substring(0, 5)}
            onChange={(e) => {
              handleTimeChange(index, e.target.value);
            }}
          />
          <div className="flex">
            <Button onClick={() => handleRemoveEntry(index)} variant="link">
              <TrashIcon className="h-4 w-4 text-destructive hover:text-destructive/60" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryAvailableDatesAndTimesEdit;
