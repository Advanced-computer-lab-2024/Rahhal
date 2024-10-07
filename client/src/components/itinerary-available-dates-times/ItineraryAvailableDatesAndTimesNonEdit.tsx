import React from 'react';

interface DateTimeEntry {
  Date: Date;
  Time: Date;
}

interface ItineraryAvailableDatesAndTimesNonEditProps {
  availableDatesTime: DateTimeEntry[];
}

const ItineraryAvailableDatesAndTimesNonEdit: React.FC<ItineraryAvailableDatesAndTimesNonEditProps> = ({
  availableDatesTime,
}) => {
  return (
    <div className="space-y-2">
      {availableDatesTime.length === 0 ? (
        <p>No available dates and times set.</p>
      ) : (
        availableDatesTime.map((entry, index) => (
          <div key={index} className="flex justify-between items-center">
            <span>{entry.Date.toLocaleDateString()}</span>
            <span>{entry.Time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default ItineraryAvailableDatesAndTimesNonEdit;
