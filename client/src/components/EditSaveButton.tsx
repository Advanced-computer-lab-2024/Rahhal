import { Pen, Save } from "lucide-react";
import { Button } from "./ui/button";

interface EditSaveButtonProps {
  isDisabled: boolean;
  toggleEditMode: () => void;
  saveChanges: () => void;
}

const EDIT_MODE = "Edit";
const SAVE_MODE = "Save";

function EditSaveButton({ isDisabled, toggleEditMode, saveChanges }: EditSaveButtonProps) {
  return (
    <Button
      onClick={isDisabled ? toggleEditMode : saveChanges}
      className="ml-2 p-2"
      title={isDisabled ? EDIT_MODE : SAVE_MODE}
    >
      {isDisabled ? <Pen size={16} /> : <Save size={16} />}
    </Button>
  );
}

export default EditSaveButton;
