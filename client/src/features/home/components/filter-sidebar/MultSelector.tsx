import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

type LanguageSelectorProps = {
  placeholder: string;
  setSelectedOption: (value: Option[]) => void;
  options?: Option[];
};

function MultSelector({ placeholder, setSelectedOption, options }: LanguageSelectorProps) {
  return (
    <div className="w-[280px]  h-[200px]">
      <MultipleSelector
        defaultOptions={options}
        placeholder={placeholder}
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            no results found.
          </p>
        }
        onChange={setSelectedOption}
      />
    </div>
  );
}

export default MultSelector;
