import EntertainmentCard from "@/components/entertainment-card/EntertainmentCard";
import felluca from "./assets/aswan2.webp";
import ski from "./assets/ski egypt.jpg";
import FilterSideBar from "@/components/filter-sidebar/FilterSideBar";
import MinMaxRangeSlider from "@/components/filter-sidebar/MinMaxRangeSlider";
import { useState } from "react";
import DatePickerWithRange from "@/components/filter-sidebar/DatePickerWithRange";
import FilterStarRating from "@/components/filter-sidebar/FilterStarRating";
import "./App.css";
import { Button } from "./components/ui/button";
import { DateRange } from "react-day-picker";
import { FilterX } from "lucide-react";
import SignupTourist from "./components/forms/SignupTourist";
import SignupTourGuide from "./components/forms/SignupTourGuide";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignupSeller from "./components/forms/SignupSeller";
import SignupAdvertiser from "./components/forms/SignupAdvertiser";
import SignupSelector from "./components/forms/SignupSelector";

function App() {
  const queryClient = new QueryClient (); 
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedDates, setSelectedDates] = useState<DateRange>({ from: undefined, to: undefined });
  const resetFilters = () => {
    setPriceRange([0, 500]);
    setSelectedRatings([]);
    setSelectedDates({ from: undefined, to: undefined });
  };
  const sideBarItems = [
    {
      title: "Reset Filters",
      content: (
        <Button variant="outline" size="icon" onClick={resetFilters}>
          <FilterX className="w-4 h-4" />
        </Button>
      ),
    },
    {
      title: "Price Range",
      content: <MinMaxRangeSlider values={priceRange} onValueChange={setPriceRange} />,
    },
    {
      title: "Date",
      content: <DatePickerWithRange values={selectedDates} onValuesChange={setSelectedDates} />,
    },
    {
      title: "Rating",
      content: <FilterStarRating values={selectedRatings} onValueChange={setSelectedRatings} />,
    },
  ];

  const entertainmentData = [
    // Pyramid 1 - no date
    {
      image: Pyramid,
      rating: 5,
      title: "Great Pyramids Of Giza - Entry 1 (No Date)",
      location: "Giza",
      price: 200,
      openingTime: "Sunday-Saturday 7AM-5PM",
    },
    // Ski 1 - with date
    {
      image: ski,
      rating: 4.8,
      title: "Ski Egypt - Entry 1 (Date: 2024-10-10)",
      location: "6th Of October",
      price: 200,
      availability: true,
      date: new Date("2024-10-10"),
    },
    // Felluca 1 - with date
    {
      image: felluca,
      rating: 4.3,
      title: "Felluca Ride in Nile Aswan - Entry 1 (Date: 2024-11-10)",
      location: "Aswan",
      price: 300,
      date: new Date("2024-11-10"),
    },
    // Felluca 2 - with date
    {
      image: felluca,
      rating: 2.8,
      title: "Felluca Ride in Nile Luxor - Entry 1 (Date: 2024-10-12)",
      location: "Luxor",
      price: 150,
      date: new Date("2024-10-12"),
    },
    // Ski 2 - with date
    {
      image: ski,
      rating: 3.7,
      title: "Ski Egypt - Entry 2 (Date: 2024-12-12)",
      location: "6th Of October",
      price: 250,
      date: new Date("2024-12-12"),
    },
    // Pyramid 2 - with date
    {
      image: Pyramid,
      rating: 5,
      title: "Great Pyramids Of Giza - Entry 2 (Date: 2024-10-11)",
      location: "Giza",
      price: 200,
      openingTime: "Sunday-Saturday 7AM-5PM",
      date: new Date("2024-10-11"),
    },
    // Ski 3 - no date
    {
      image: ski,
      rating: 4.8,
      title: "Ski Egypt - Entry 3 (No Date)",
      location: "6th Of October",
      price: 200,
      availability: true,
    },
    // Felluca 3 - no date
    {
      image: felluca,
      rating: 4.3,
      title: "Felluca Ride in Nile Aswan - Entry 2 (No Date)",
      location: "Aswan",
      price: 300,
    },
    // Felluca 4 - no date
    {
      image: felluca,
      rating: 2.8,
      title: "Felluca Ride in Nile Luxor - Entry 2 (No Date)",
      location: "Luxor",
      price: 150,
    },
    // Ski 4 - no date
    {
      image: ski,
      rating: 3.7,
      title: "Ski Egypt - Entry 4 (No Date)",
      location: "6th Of October",
      price: 250,
    },
  ];

  const filteredData = entertainmentData.filter((item) => {
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    const matchesRating =
      selectedRatings.length === 0 ||
      selectedRatings.some((rating) => item.rating >= rating && item.rating < rating + 1);
    const adjustedToDate = selectedDates?.to
      ? new Date(selectedDates.to.getTime() + 86400000)
      : null;
    const matchesDate =
      !selectedDates?.from ||
      (item.date && selectedDates.from && adjustedToDate
        ? item.date >= selectedDates.from && item.date < adjustedToDate
        : true);
    return matchesPrice && matchesRating && matchesDate;
  });
  return (
    // <div className="flex flex-row gap-5">
    //    <FilterSideBar isOpen={isOpen} sideBarItems={sideBarItems} />
    //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-fr">
    //     {filteredData.map((data, index) => (
    //       <EntertainmentCard key={index} {...data} />
    //     ))}
    //   </div>
    //   <Button onClick={() => setIsOpen(!isOpen)}>Filters</Button> 
      
    // </div>
    <>
    <QueryClientProvider client={queryClient}>
    {/* {SignupAdvertiser()}
     */}
     {SignupSelector()}
    </QueryClientProvider>
    </>
  );
}

export default App;
