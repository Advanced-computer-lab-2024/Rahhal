import { useState } from "react";
import EditSaveButton from "../EditSaveButton";
import { DateTimePickerForm } from "../time-picker/date-time-picker-form";
import { Card } from "../ui/card";
import { Label } from "../ui/label";

interface EditableDatePickerProps {
  date: Date | undefined;
  initialIsDisabled?: boolean;
  onDateChange: (date: Date) => void;
}

function EditableDatePicker({
  date,
  initialIsDisabled = false,
  onDateChange,
}: EditableDatePickerProps) {
  const [isDisabled, setIsDisabled] = useState(initialIsDisabled);

  return (
    <Card className="flex flex-col p-4">
      <div className="flex justify-between items-center">
        <Label>Date</Label>
        <EditSaveButton
          isDisabled={isDisabled}
          toggleEditMode={() => setIsDisabled(false)}
          saveChanges={() => setIsDisabled(true)}
        />
      </div>
      <div className="flex items-center">
        <DateTimePickerForm date={date} onDateChange={onDateChange} />
      </div>
    </Card>
  );
}

export default EditableDatePicker;
