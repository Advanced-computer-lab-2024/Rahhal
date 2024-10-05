import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface InputDisabledWithLabelProps {
  placeholder: string;
  initialValue: string;
}

const InputDisabledWithLabel: React.FC<InputDisabledWithLabelProps> = ({
  placeholder,
  initialValue,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleEditClick = () => {
    setIsDisabled(false);
  };

 
  const handleSave = () => {
    setIsDisabled(true);
  
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div className="flex flex-col">
     
      <Label>Title</Label>
     
      <div className="flex items-center mt-2">
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          disabled={isDisabled}
          className="flex-grow" 
        />
        <Button
          onClick={isDisabled ? handleEditClick : handleSave}
          className="ml-2"
        >
          <i className="icon-pen" /> {isDisabled ? "Edit" : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default InputDisabledWithLabel;
