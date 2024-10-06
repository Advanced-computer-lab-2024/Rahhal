import React from "react";
import { useState, useImperativeHandle, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pen, Save } from "lucide-react";
import EditSaveButton from "./EditSaveButton";

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
    <div className="flex flex-col m-5 mx-6">
      <Label className="mb-2">{title}</Label>
      <div className="flex items-center">
        <Input
          type="text"
          placeholder={placeholder}
          value={fieldValue}
          onChange={handleFieldChange}
          onKeyDown={handleKeyPress}
          disabled={isDisabled}
          className="flex-grow"
        />
        <EditSaveButton isDisabled={isDisabled} toggleEditMode={toggleEditMode} saveChanges={saveChanges} />
      </div>
    </div>
  );
});

export default ShortText;