import type { Option } from "@/components/ui/multiple-selector";
import MultSelector from "@/features/home/components/filter-sidebar/MultSelector";

export function ItinerariesFilter(
  options: Set<string>[],
  setSelectedOption: (selectedOptions: Option[]) => void,
) {
  return [
    {
      title: "Language",
      content: (
        <MultSelector
          placeholder="Choose Language(s)"
          setSelectedOption={setSelectedOption}
          options={options}
        />
      ),
    },
  ];
}
