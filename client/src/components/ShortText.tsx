import React from "react";
import { useState, useImperativeHandle, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pen, Save } from "lucide-react";

interface ShortTextProps {
  placeholder: string;
  initialValue: string;
  initialDisabled?: boolean;
  title: string;
  onSave?: (value: string, isDisabled: boolean) => void;
}

export interface ShortTextRef {
  isDisabled: boolean;
}

const ShortText = forwardRef<ShortTextRef, ShortTextProps>(({
  placeholder,
  initialValue,
  initialDisabled = true,
  title,
  onSave
}, ref) => {
  const [isDisabled, setIsDisabled] = useState(initialDisabled);
  const [fieldValue, setFieldValue] = useState(initialValue);

  const EDIT_MODE = "Edit";
  const SAVE_MODE = "Save";

  useImperativeHandle(ref, () => ({
    get isDisabled() {
      return isDisabled;
    }
  }));

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(event.target.value);
  };

  const toggleEditMode = () => {
    setIsDisabled(false);
  };
    
  const saveChanges = () => {
    setIsDisabled(true);
    if (onSave) {
      onSave(fieldValue, true);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      saveChanges();
    }
  };

  return (
    <div className="flex flex-col">
      <Label>{title}</Label>
      <div className="flex items-center mt-2">
        <Input
          type="text"
          placeholder={placeholder}
          value={fieldValue}
          onChange={handleFieldChange}
          onKeyDown={handleKeyPress}
          disabled={isDisabled}
          className="flex-grow"
        />
        <Button
          onClick={isDisabled ? toggleEditMode : saveChanges}
          className="ml-2 p-2"
          title={isDisabled ? EDIT_MODE : SAVE_MODE}
        >
          {isDisabled ? <Pen size={16} /> : <Save size={16} />}
        </Button>
      </div>
    </div>
  );
});

export default ShortText;