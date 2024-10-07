import { DateRange } from "react-day-picker";
import FilterStarRating from "@/components/filter-sidebar/FilterStarRating";
import MinMaxRangeSlider from "@/components/filter-sidebar/MinMaxRangeSlider";
import DatePickerWithRange from "@/components/filter-sidebar/DatePickerWithRange";

export function CommonFilter(
  selectedDates: DateRange,
  setSelectedDates: (values: DateRange) => void,
  selectedPriceRange: number[],
  setPriceRange: (value: number[]) => void,
  selectedRatings: number[],
  setSelectedRatings: (value: number[]) => void,
  hideDateRange: boolean,
) {
  const filterList = [
    {
      title: "Price Category",
      content: <MinMaxRangeSlider values={[0, 100]} onValueChange={setPriceRange} />,
    },
    {
      title: "Rating",
      content: <FilterStarRating values={selectedRatings} onValueChange={setSelectedRatings} />,
    },
  ];
  const dateRange = hideDateRange
    ? []
    : [
        {
          title: "Date",
          content: <DatePickerWithRange values={selectedDates} onValuesChange={setSelectedDates} />,
        },
      ];

  return dateRange.concat(filterList);
}
