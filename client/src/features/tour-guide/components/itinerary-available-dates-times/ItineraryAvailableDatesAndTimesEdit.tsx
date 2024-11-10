import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DateTimeEntry {
  Date: Date;
  Time: Date;
}

interface ItineraryAvailableDatesAndTimesEditProps {
  availableDatesTime: DateTimeEntry[];
  onSave: (newDatesTime: DateTimeEntry[]) => void;
}

const ItineraryAvailableDatesAndTimesEdit: React.FC<ItineraryAvailableDatesAndTimesEditProps> = ({
  availableDatesTime,
  onSave,
}) => {
  const [editedDatesTime, setEditedDatesTime] = useState<DateTimeEntry[]>(() =>
    availableDatesTime.map((entry) => ({
      Date: new Date(entry.Date),
      Time: new Date(entry.Time),
    }))
  );

  const handleDateChange = (index: number, newDate: string) => {
    const updatedDatesTime = [...editedDatesTime];
    updatedDatesTime[index] = {
      ...updatedDatesTime[index],
      Date: new Date(newDate),
      Time: new Date(updatedDatesTime[index].Time),
    };
    setEditedDatesTime(updatedDatesTime);
  };

  const handleTimeChange = (index: number, newTime: string) => {
    const updatedDatesTime = [...editedDatesTime];
    const [hours, minutes] = newTime.split(":");
    const newDateTime = new Date(updatedDatesTime[index].Date);
    newDateTime.setHours(parseInt(hours), parseInt(minutes));
    updatedDatesTime[index] = { ...updatedDatesTime[index], Time: newDateTime };
    setEditedDatesTime(updatedDatesTime);
  };

  const handleAddEntry = () => {
    setEditedDatesTime([...editedDatesTime, { Date: new Date(), Time: new Date() }]);
  };

  const handleRemoveEntry = (index: number) => {
    const updatedDatesTime = editedDatesTime.filter((_, i) => i !== index);
    setEditedDatesTime(updatedDatesTime);
  };

  const handleSave = () => {
    console.log("Edited Dates:", editedDatesTime); // Log to check edited dates
    onSave(editedDatesTime); // Call onSave with the updated dates and times
  };

  return (
    <div>
      {editedDatesTime.map((entry, index) => (
        <div key={index} className="flex space-x-2 mb-2">
          <Input
            type="date"
            value={entry.Date.toISOString().split("T")[0]}
            onChange={(e) => handleDateChange(index, e.target.value)}
          />
          <Input
            type="time"
            value={entry.Time.toISOString().split("T")[1].substring(0, 5)}
            onChange={(e) => handleTimeChange(index, e.target.value)}
          />
          <Button onClick={() => handleRemoveEntry(index)}>Remove</Button>
        </div>
      ))}
      <Button onClick={handleAddEntry}>Add Entry</Button>
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};

export default ItineraryAvailableDatesAndTimesEdit;
