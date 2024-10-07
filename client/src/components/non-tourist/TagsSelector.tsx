import { useState } from "react";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import EditSaveButton from "../EditSaveButton";

type TagsSelectorProps = {
  placeholder: string;
  onSave: (selectedOptions: Option[]) => void;
  options?: Option[];
  initialOptions?: Option[];
  isEditingInitially?: boolean;
};

function TagsSelector({
  placeholder,
  onSave,
  options,
  initialOptions,
  isEditingInitially = false,
}: TagsSelectorProps) {
  const [isEditing, setIsEditing] = useState(isEditingInitially);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(initialOptions ?? []);

  const handleSave = () => {
    onSave(selectedOptions);
    setIsEditing(false);
  };

  return (
    <div className="w-full flex items-center">
      <div className="flex-grow">
        <MultipleSelector
          defaultOptions={options}
          placeholder={placeholder}
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              no results found.
            </p>
          }
          disabled={!isEditing}
          onChange={setSelectedOptions}
          value={selectedOptions}
        />
      </div>
      <div className="ml-4 flex">
        <EditSaveButton
          isDisabled={!isEditing}
          toggleEditMode={() => setIsEditing(!isEditing)}
          saveChanges={handleSave}
        />
      </div>
    </div>
  );
}

export default TagsSelector;
