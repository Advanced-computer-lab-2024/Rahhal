import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ItineraryAvailableDatesAndTimesEdit from './ItineraryAvailableDatesAndTimesEdit';
import ItineraryAvailableDatesAndTimesNonEdit from './ItineraryAvailableDatesAndTimesNonEdit';

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
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (newDatesTime: DateTimeEntry[]) => {
    console.log("Saving Dates and Times: ", newDatesTime);
    onSave(newDatesTime); // Call the onSave prop to update the parent state
    setIsEditing(false);  // Exit edit mode after saving
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <span>Available Dates and Times</span>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <ItineraryAvailableDatesAndTimesEdit
            availableDatesTime={availableDatesTime}
            onSave={handleSave}
          />
        ) : (
          <ItineraryAvailableDatesAndTimesNonEdit availableDatesTime={availableDatesTime} />
        )}
      </CardContent>
    </Card>
  );
};

export default ItineraryAvailableDatesAndTimes;
