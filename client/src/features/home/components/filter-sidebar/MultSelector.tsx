import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

type LanguageSelectorProps = {
  placeholder: string;
  setSelectedOption: (value: Option[]) => void;
  options?: Option[];
};

function MultSelector({ placeholder, setSelectedOption, options }: LanguageSelectorProps) {
  return (
    <div className="w-[90%] h-[100px] mt-2">
      <MultipleSelector
        defaultOptions={options}
        placeholder={placeholder}
        emptyIndicator={
          <p className="text-center text-md text-gray-600 dark:text-gray-400">no results found.</p>
        }
        onChange={setSelectedOption}
      />
    </div>
  );
}

export default MultSelector;
