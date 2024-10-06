import { TimePicker12H } from "../time-picker/time-picker-12hour";
import EditSaveButton from "../EditSaveButton";
import { useState } from "react";

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
    <div className="flex flex-row items-end m-5 mx-6">
      <TimePicker12H date={time} setDate={onTimeChange} disabled={isDisabled} />
      <EditSaveButton
        isDisabled={isDisabled}
        toggleEditMode={() => setIsDisabled(false)}
        saveChanges={() => setIsDisabled(true)}
      />
    </div>
  );
}

export default EditableTimePicker;
