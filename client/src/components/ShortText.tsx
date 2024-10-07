import React from "react";
import { useState, useImperativeHandle, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EditSaveButton from "./EditSaveButton";
import { Card } from "./ui/card";

interface ShortTextProps {
  placeholder: string;
  initialValue: string;
  initialDisabled?: boolean;
  title: string;
  type: string;
  onSave?: (value: string, isDisabled: boolean) => void;
}

export interface ShortTextRef {
  isDisabled: boolean;
}

const ShortText = forwardRef<ShortTextRef, ShortTextProps>(
  ({ placeholder, initialValue, initialDisabled = true, title, type, onSave }, ref) => {
    const [isDisabled, setIsDisabled] = useState(initialDisabled);
    const [fieldValue, setFieldValue] = useState(initialValue);

    useImperativeHandle(ref, () => ({
      get isDisabled() {
        return isDisabled;
      },
    }));
    useImperativeHandle(ref, () => ({
      get isDisabled() {
        return isDisabled;
      },
    }));

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue(event.target.value);
    };
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
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        saveChanges();
      }
    };

    return (
      <Card className="flex flex-col p-4">
        <div className="flex justify-between items-center">
          <Label>{title}</Label>
          <EditSaveButton
            isDisabled={isDisabled}
            toggleEditMode={toggleEditMode}
            saveChanges={saveChanges}
          />
        </div>
        <div className="flex items-center">
          <Input
            type={type}
            placeholder={placeholder}
            value={fieldValue}
            onChange={handleFieldChange}
            onKeyDown={handleKeyPress}
            disabled={isDisabled}
            className="flex-grow"
          />
        </div>
      </Card>
    );
  },
);

export default ShortText;
