import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import ItineraryAvailableDatesAndTimesEdit from "./ItineraryAvailableDatesAndTimesEdit";
import { PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";

interface DateTimeEntry {
  Date: Date;
  Time: Date;
}

interface ItineraryAvailableDatesAndTimesProps {
  availableDatesTime: DateTimeEntry[];
  onSave: (newDatesTime: DateTimeEntry[]) => void;
}

const ItineraryAvailableDatesAndTimes: React.FC<ItineraryAvailableDatesAndTimesProps> = ({
  availableDatesTime,
  onSave,
}) => {
  const handleSave = (newDatesTime: DateTimeEntry[]) => {
    onSave(newDatesTime); // Call the onSave prop to update the parent state
  };

  const handleAdd = () => {
    onSave([...availableDatesTime, { Date: new Date(), Time: new Date() }]); // Add a new entry to the availableDatesTime array
  };

  useEffect(() => {
    if (availableDatesTime.length === 0) {
      handleAdd(); // Add a new entry to the availableDatesTime array if it
    }
  }, []);

  return (
    <div>
      <div className="flex gap-3 items-center">
        <Label className="text-lg">Available Dates and Times</Label>
        <Button variant="link" className="p-0" onClick={handleAdd}>
          <PlusCircle className="h-5 w-5 text-primary-color" />
        </Button>
      </div>

      <ItineraryAvailableDatesAndTimesEdit
        availableDatesTime={availableDatesTime}
        onSave={handleSave}
      />
    </div>
  );
};

export default ItineraryAvailableDatesAndTimes;
