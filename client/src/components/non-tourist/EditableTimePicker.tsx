import { TimePicker12H } from "../time-picker/time-picker-12hour";
import EditSaveButton from "../EditSaveButton";
import { useState } from "react";
import { Card } from "../ui/card";
import { Label } from "../ui/label";

interface EditableTimePickerProps {
  time: Date | undefined;
  initialIsDisabled?: boolean;
  onTimeChange: (time: Date | undefined) => void;
}

function EditableTimePicker({
  time,
  initialIsDisabled = false,
  onTimeChange,
}: EditableTimePickerProps) {
  const [isDisabled, setIsDisabled] = useState(initialIsDisabled);

  return (
    <Card className="flex flex-col p-4">
      <div className="flex justify-between items-center">
        <Label>Time</Label>
        <EditSaveButton
          isDisabled={isDisabled}
          toggleEditMode={() => setIsDisabled(false)}
          saveChanges={() => setIsDisabled(true)}
        />
      </div>
      <div className="flex items-center">
        <TimePicker12H date={time} setDate={onTimeChange} disabled={isDisabled} />
      </div>
    </Card>
  );
}

export default EditableTimePicker;
