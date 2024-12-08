import React, { useState } from "react";
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
  const [addTrigger, setAddTrigger] = useState(false);

  const handleSave = (newDatesTime: DateTimeEntry[]) => {
    onSave(newDatesTime); // Call the onSave prop to update the parent state
  };

  return (
    <div>
      <div className="flex gap-3 items-center">
        <Label className="text-lg">Available Dates and Times</Label>
        <Button
          variant="link"
          className="p-0"
          onClick={() => {
            setAddTrigger(true);
          }}
        >
          <PlusCircle className="h-5 w-5 hover:text-gray-600" />
        </Button>
      </div>

      <ItineraryAvailableDatesAndTimesEdit
        availableDatesTime={availableDatesTime}
        addTrigger={addTrigger}
        triggerClenup={() => setAddTrigger(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default ItineraryAvailableDatesAndTimes;
