import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

const OPTIONS: Option[] = [
  { label: "Family Friendly", value: "family-friendly" },
  { label: "Religious", value: "religious" },
  { label: "Historical", value: "historical" },
];

const TagsSelector = () => {
  return (
    <div className="w-full px-10">
      <MultipleSelector
        defaultOptions={OPTIONS}
        placeholder="Select frameworks you like..."
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            no results found.
          </p>
        }
      />
    </div>
  );
};

export default TagsSelector;
