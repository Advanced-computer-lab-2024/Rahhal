import type { Option } from "@/components/ui/multiple-selector";
import MultSelector from "@/features/home/components/filter-sidebar/MultSelector";

export function HistoricalPlacesFilter(
  options: Option[],
  setSelectedOption: (selectedOptions: Option[]) => void,
) {
  return [
    {
      title: "Historical Tags",
      content: (
        <MultSelector
          placeholder="Choose Tag(s)"
          setSelectedOption={setSelectedOption}
          options={options}
        />
      ),
    },
  ];
}
