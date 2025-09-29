import Plane from "@/assets/Plane.png";
import paris from "@/assets/Paris.png";
import berlin from "@/assets/Berlin.png";
import Cairo from "@/assets/Cairo.png";
import milan from "@/assets/Milan.png";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import useEmblaCarousel from "embla-carousel-react";
import { useFlightSearchBarStore } from "@/stores/search-bar-stores/flight-searchbar-slice";
import { useGeneralSearchBarStore } from "@/stores/general-search-bar-store";

interface Destination {
  name: string;
  image: string;
  placeId: string;
  address: string;
  iataCode: string;
}

export default function FlightsLandingComponent() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [slidesPerView, setSlidesPerView] = useState(1);
  const {
    setDepartureLocation,
    setArrivalLocation,
    setArrivalSuggestionsPlaceId,
    setDepartureSuggestionsPlaceId,
  } = useFlightSearchBarStore();
  const { focusIndex, setFocusIndex, setOpen } = useGeneralSearchBarStore();

  const destinations: Destination[] = [
    {
      name: "Paris",
      image: paris,
      placeId: "ChIJHTtq-rF15kcRIoTbQ9feeJ0",
      address: "Paris Orly Airport (ORY), Orly, France",
      iataCode: "ORY",
    },
    {
      name: "Berlin",
      image: berlin,
      placeId: "ChIJUTAoz9NGqEcRCGpRR5dAFJA",
      address:
        "Berlin Brandenburg Airport Willy Brandt (BER), Melli-Beese-Ring, Schönefeld, Germany",
      iataCode: "BER",
    },
    {
      name: "Cairo",
      image: Cairo,
      placeId: "ChIJOWJsUarIhkcRYNL_HukulK8",
      address: "Cairo International Airport (CAI), El Nozha, Egypt",
      iataCode: "CAI",
    },
    {
      name: "Milan",
      image: milan,
      placeId: "ChIJDYMynm9QgUcRggAD8frHdwE",
      address:
        "Milan Linate Airport (LIN), Viale Forlanini, Segrate, Metropolitan City of Milan, Italy",
      iataCode: "LIN",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi, slidesPerView]);

  const handleCardClick = (destinationName: string, e) => {
    e.stopPropagation();
    let departureSuggestionsPlaceId: string[] = [];
    let arrivalSuggestionsPlaceId: string[] = [];
    let arrivalLocation: string = "";

    const targetElement = document.querySelector("#searchBar");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      departureSuggestionsPlaceId = [
        destinations.find((destination) => destination.name === "Cairo")
          ?.placeId || "",
      ];
      destinations.forEach((destination) => {
        if (destination.name === destinationName) {
          arrivalSuggestionsPlaceId = [destination.placeId];
          arrivalLocation = destination.address;
        }
      });
      setDepartureLocation(
        "Cairo International Airport (CAI), El Nozha, Egypt"
      );
      setArrivalLocation(arrivalLocation);
      setDepartureSuggestionsPlaceId(departureSuggestionsPlaceId);
      setArrivalSuggestionsPlaceId(arrivalSuggestionsPlaceId);
      setFocusIndex(3);
    }
  };
  return (
    <div className="w-full px-0 sm:px-8 lg:px-16 py-4">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden w-full h-64 sm:h-80 lg:h-96">
        <img
          src={Plane}
          alt="Explore every destination"
          className="w-full h-full object-cover p-2 rounded-2xl "
        />
        <div className="absolute rounded-lg inset-0 bg-black bg-opacity-40 m-2 flex flex-col justify-center items-start px-8 sm:px-16">
          <p className="text-white text-lg sm:text-xl font-medium">
            Can’t decide where to go?
          </p>
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mt-2">
            Explore every destination
          </h1>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="px-4 sm:px-0 py-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 px-2 sm:px-0">
          Trending destinations
        </h1>
        <div className="relative px-4 sm:px-0">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            ref={emblaRef}
          >
            <CarouselContent className="flex gap-2 sm:gap-4">
              {destinations.map((destination, index) => (
                <CarouselItem
                  key={index}
                  className="pl-0 cursor-pointer"
                  style={{ flex: `0 0 ${100 / slidesPerView}%` }}
                >
                  <Card
                    className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 mx-1 sm:mx-0"
                    onClick={(e) => handleCardClick(destination.name, e)}
                  >
                    <div className="relative aspect-[4/3]">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <h2 className="absolute bottom-3 sm:bottom-4 left-6 sm:left-6 text-white text-lg sm:text-xl lg:text-2xl xl:text-4xl font-bold drop-shadow-lg">
                        {destination.name}
                      </h2>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Mobile Navigation Arrows */}
            <CarouselPrevious className="sm:hidden -left-2 w-8 h-8 bg-white/90 hover:bg-white border-2 shadow-lg" />
            <CarouselNext className="sm:hidden -right-2 w-8 h-8 bg-white/90 hover:bg-white border-2 shadow-lg" />

            {/* Desktop Navigation Arrows */}
            <CarouselPrevious className="hidden sm:flex left-0 sm:-left-12 w-10 h-10 bg-white hover:bg-gray-50" />
            <CarouselNext className="hidden sm:flex right-0 sm:-right-12 w-10 h-10 bg-white hover:bg-gray-50" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
