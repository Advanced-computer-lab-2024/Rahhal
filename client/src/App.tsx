import EntertainmentCard from "@/components/entertainment-card/EntertainmentCard";
import Pyramid from "./assets/pyramids.webp";
import felluca from "./assets/aswan2.webp";
import ski from "./assets/ski egypt.jpg";
import FilterSideBar from "@/components/filter-sidebar/FilterSideBar";
import MinMaxRangeSlider from "@/components/filter-sidebar/MinMaxRangeSlider";
import { useState } from "react";
import DatePickerWithRange from "@/components/filter-sidebar/DatePickerWithRange";
import FilterStarRating from "@/components/filter-sidebar/FilterStarRating";
import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const sideBarItems = [
    {
      title: "Price Range",
      content: <MinMaxRangeSlider values={priceRange} onValueChange={setPriceRange} />,
    },
    {
      title: "Date",
      content: <DatePickerWithRange />,
    },
    {
      title: "Rating",
      content: <FilterStarRating values={selectedRatings} onValueChange={setSelectedRatings} />,
    },
  ];

  const entertainmentData = [
    {
      image: Pyramid,
      rating: 5,
      title: "Great Pyramids Of Giza",
      location: "Giza",
      price: 200,
      openingTime: "Sunday-Saturday 7AM-5PM",
    },
    {
      image: ski,
      rating: 4.8,
      title: "Ski Egypt",
      location: "6th Of October",
      price: 200,
      availability: true,
    },
    {
      image: felluca,
      rating: 4.3,
      title: "Felluca Ride in Nile Aswan",
      location: "Aswan",
      price: 300,
    },
    {
      image: felluca,
      rating: 2.8,
      title: "Felluca Ride in Nile Luxor",
      location: "Luxor",
      price: 150,
    },
    {
      image: ski,
      rating: 3.7,
      title: "Ski Egypt",
      location: "6th Of October",
      price: 250,
    },
    {
      image: Pyramid,
      rating: 5,
      title: "Great Pyramids Of Giza",
      location: "Giza",
      price: 200,
      openingTime: "Sunday-Saturday 7AM-5PM",
    },
    {
      image: ski,
      rating: 4.8,
      title: "Ski Egypt",
      location: "6th Of October",
      price: 200,
      availability: true,
    },
    {
      image: felluca,
      rating: 4.3,
      title: "Felluca Ride in Nile Aswan",
      location: "Aswan",
      price: 300,
    },
    {
      image: felluca,
      rating: 2.8,
      title: "Felluca Ride in Nile Luxor",
      location: "Luxor",
      price: 150,
    },
    {
      image: ski,
      rating: 3.7,
      title: "Ski Egypt",
      location: "6th Of October",
      price: 250,
    },

  ];

  const filteredData = entertainmentData.filter(item => {
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    const matchesRating = selectedRatings.length === 0 || selectedRatings.some(rating => item.rating >= rating && item.rating < rating + 1);
    return matchesPrice && matchesRating;
  });
  return (
    <div className="flex flex-row gap-5">
      <FilterSideBar isOpen={isOpen} sideBarItems={sideBarItems} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-fr">
        {filteredData.map((data, index) => (
          <EntertainmentCard key={index} {...data} />
        ))}
      </div>
      <Button onClick={() => setIsOpen(!isOpen)}>Filters</Button>
    </div>
  );
}
