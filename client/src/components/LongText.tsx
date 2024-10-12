import React from "react";
import { useState, useImperativeHandle, forwardRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import EditSaveButton from "./EditSaveButton";
import { Card } from "./ui/card";
interface LongTextProps {
  placeholder: string;
  initialValue: string;
  initialDisabled?: boolean;
  title: string;
  onSave?: (value: string, isDisabled: boolean) => void;
}
export interface LongTextRef {
  isDisabled: boolean;
}
const LongText = forwardRef<LongTextRef, LongTextProps>(
  ({ placeholder, initialValue, initialDisabled = true, title, onSave }, ref) => {
    const [isDisabled, setIsDisabled] = useState(initialDisabled);
    const [fieldValue, setFieldValue] = useState(initialValue);
    useImperativeHandle(ref, () => ({
      get isDisabled() {
        return isDisabled;
      },
    }));
    const handleFieldChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        <div className="flex flex-col">
          <Textarea
            placeholder={placeholder}
            value={fieldValue}
            onChange={handleFieldChange}
            disabled={isDisabled}
            className="flex-grow min-h-60"
          />
        </div>
      </Card>
    );
  },
);
export default LongText;
