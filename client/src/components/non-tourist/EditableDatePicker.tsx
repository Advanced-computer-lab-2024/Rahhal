import { useState } from "react";
import EditSaveButton from "../EditSaveButton";
import { DateTimePickerForm } from "../time-picker/date-time-picker-form";

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
    <div className="flex-row items-end m-5 mx-6">
      <DateTimePickerForm date={date} onDateChange={onDateChange} />
      <EditSaveButton
        isDisabled={isDisabled}
        toggleEditMode={() => setIsDisabled(false)}
        saveChanges={() => setIsDisabled(true)}
      />
    </div>
  );
}

export default EditableDatePicker;
