import { useState } from "react";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { Edit2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

type TagsSelectorProps = {
  placeholder: string;
  onSave: (selectedOptions: Option[]) => void;
  options?: Option[];
  initialOptions?: Option[];
};

function TagsSelector({ placeholder, onSave, options, initialOptions }: TagsSelectorProps) {
  const [isEditing, setIsEditing] = useState(false);
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
        />
      </div>
      <div className="ml-4 flex">
        {isEditing ? (
          <Button variant="ghost" size="icon" onClick={handleSave} disabled={!isEditing}>
            <Save className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)}>
            <Edit2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default TagsSelector;
