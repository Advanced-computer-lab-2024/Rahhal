import GeneralGridStyle from "./GeneralGridView.module.css";
import EntertainmentCard from "@/components/entertainment-card/EntertainmentCard";
import felluca from "../../../assets/aswan2.webp";
import ski from "../../../assets/ski egypt.jpg";
import activitypic from "../../../assets/activity.png";
import placepic from "../../../assets/Historic site.png";
import itinerarypic from "../../../assets/iternerary.png";
import pyramid from "../../../assets/pyramids.webp";
import aswan from "../../../assets/Aswan.webp";
import { useEffect, useState } from "react";

type Filter = "itinerary" | "place" | "activity";

const mockItineraries: Itinerary[] = [
  {
    id: 1,
    image: felluca,
    rating: 4.5,
    title: "Felluca Ride in Nile",
    location: "Aswan",
    price: 300,
    language: ["English", "Arabic"],
  },
  {
    id: 2,
    image: ski,
    rating: 4.2,
    title: "Cairo City Tour",
    location: "Cairo",
    price: 200,
    language: ["English", "French"],
  },
];

const mockActivities: Activity[] = [
  {
    id: 1,
    image: aswan,
    rating: 4.8,
    title: "Skiing in Egypt",
    location: "6th Of October",
    price: 250,
    availability: true,
  },
  {
    id: 2,
    image: pyramid,
    rating: 4.6,
    title: "Desert Safari",
    location: "Giza",
    price: 150,
    availability: true,
  },
];

const mockPlaces: Place[] = [
  {
    id: 1,
    image: felluca,
    rating: 4.7,
    title: "Pyramids of Giza",
    location: "Giza",
    price: 100,
    openingTime: "8:00 AM",
  },
  {
    id: 2,
    image: pyramid,
    rating: 4.9,
    title: "The Great Sphinx",
    location: "Giza",
    price: 80,
    openingTime: "8:00 AM",
  },
];

interface Itinerary {
  id: number;
  image: string;
  rating: number;
  title: string;
  location: string;
  price: number;
  language: string[];
}

interface Activity {
  id: number;
  image: string;
  rating: number;
  title: string;
  location: string;
  price: number;
  availability: boolean;
}

interface Place {
  id: number;
  image: string;
  rating: number;
  title: string;
  location: string;
  price: number;
  openingTime: string;
}
// filter using the 3 icons on the top

// Fetching logic from the database
const GeneralGridView = () => {
  const [activefilter, setActiveFilter] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState<Itinerary[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [place, setPlace] = useState<Place[]>([]);

  const handleActiveFilterClick = (filter: Filter) => {
    setActiveFilter((prevFilters) => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter((item) => item !== filter); // Remove if selected
      } else {
        return [...prevFilters, filter]; // Add if not selected
      }
    });
  };

  //   useEffect(() => {
  //     fetch("http://rahhal/api/itineraries")
  //       .then((response) => response.json())
  //       .then((data) => setItinerary(data));
  //   }, []);

  //   useEffect(() => {
  //     fetch("http://rahhal/api/activities")
  //       .then((response) => response.json())
  //       .then((data) => setActivity(data));
  //   }, []);

  //   useEffect(() => {
  //     fetch("http://rahhal/api/places")
  //       .then((response) => response.json())
  //       .then((data) => setPlace(data));
  //   }, []);

  useEffect(() => {
    setItinerary(mockItineraries);
  }, []);

  useEffect(() => {
    setActivity(mockActivities);
  }, []);

  useEffect(() => {
    setPlace(mockPlaces);
  }, []);

  return (
    <div className={GeneralGridStyle["general-grid-view"]}>
      <div className={GeneralGridStyle["general-grid-view__filter-container"]}>
        <div className={GeneralGridStyle["general-grid-view__filter-container__icons"]}>
          <div
            className={`${GeneralGridStyle["icon-wrapper"]} ${activefilter.includes("itinerary") ? GeneralGridStyle["selected"] : ""}`}
            onClick={() => handleActiveFilterClick("itinerary")}
          >
            <img src={itinerarypic} alt="itinerary" />
          </div>
          <div
            className={`${GeneralGridStyle["icon-wrapper"]} ${activefilter.includes("place") ? GeneralGridStyle["selected"] : ""}`}
            onClick={() => handleActiveFilterClick("place")}
          >
            <img src={placepic} alt="place" />
          </div>
          <div
            className={`${GeneralGridStyle["icon-wrapper"]} ${activefilter.includes("activity") ? GeneralGridStyle["selected"] : ""}`}
            onClick={() => handleActiveFilterClick("activity")}
          >
            <img src={activitypic} alt="activity" />
          </div>
        </div>
      </div>

      <div className={GeneralGridStyle["general-grid-view__header"]}>
        <h1>Entertainment</h1>
        <hr className="border-t border-gray-300 my-4" />
      </div>

      <div className={GeneralGridStyle["general-grid-view__card-row"]}>
        
        
        {activefilter.length===0 && (
          <>
            {itinerary.map((item) => (
              <EntertainmentCard
                key={item.id}
                image={item.image}
                rating={item.rating}
                title={item.title}
                location={item.location}
                price={item.price}
                language={item.language}
              />
            ))}
            {activity.map((item) => (
              <EntertainmentCard
                key={item.id}
                image={item.image}
                rating={item.rating}
                title={item.title}
                location={item.location}
                price={item.price}
                availability={item.availability}
              />
            ))}
            {place.map((item) => (
              <EntertainmentCard
                key={item.id}
                image={item.image}
                rating={item.rating}
                title={item.title}
                location={item.location}
                price={item.price}
                openingTime={item.openingTime}
              />
            ))}
          </>
        )}


        {activefilter.includes("itinerary") &&
          itinerary.map((item) => (
            <EntertainmentCard
              image={item.image}
              rating={item.rating}
              title={item.title}
              location={item.location}
              price={item.price}
              language={item.language}
            />
          ))}

        {activefilter.includes("activity") &&
          activity.map((item) => (
            <EntertainmentCard
              image={item.image}
              rating={item.rating}
              title={item.title}
              location={item.location}
              price={item.price}
              availability={item.availability}
            />
          ))}

        {activefilter.includes("place") &&
          place.map((item) => (
            <EntertainmentCard
              image={item.image}
              rating={item.rating}
              title={item.title}
              location={item.location}
              price={item.price}
              openingTime={item.openingTime}
            />
          ))}
      </div>

      <div className={GeneralGridStyle["general-grid-view__header"]}>
        <h1>Products</h1>
      </div>

      <div className={GeneralGridStyle["general-grid-view__card-row"]}></div>
    </div>
  );
};

export default GeneralGridView;
