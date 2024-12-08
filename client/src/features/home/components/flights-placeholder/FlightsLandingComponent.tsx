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
    },
    {
      name: "Berlin",
      image: berlin,
      placeId: "ChIJUTAoz9NGqEcRCGpRR5dAFJA",
      address:
        "Berlin Brandenburg Airport Willy Brandt (BER), Melli-Beese-Ring, Schönefeld, Germany",
    },
    {
      name: "Cairo",
      image: Cairo,
      placeId: "ChIJOWJsUarIhkcRYNL_HukulK8",
      address: "Cairo International Airport (CAI), El Nozha, Egypt",
    },
    {
      name: "Milan",
      image: milan,
      placeId: "ChIJDYMynm9QgUcRggAD8frHdwE",
      address:
        "Milan Linate Airport (LIN), Viale Forlanini, Segrate, Metropolitan City of Milan, Italy",
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
        destinations.find((destination) => destination.name === "Cairo")?.placeId || "",
      ];
      destinations.forEach((destination) => {
        if (destination.name === destinationName) {
          arrivalSuggestionsPlaceId = [destination.placeId];
          arrivalLocation = destination.address;
        }
      });
      setDepartureLocation("Cairo International Airport (CAI), El Nozha, Egypt");
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
        <img src={Plane} alt="Explore every destination" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start px-8 sm:px-16">
          <p className="text-white text-lg sm:text-xl font-medium">Can’t decide where to go?</p>
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mt-2">
            Explore every destination
          </h1>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="px-4 sm:px-0 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Trending destinations</h1>
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            ref={emblaRef}
          >
            <CarouselContent className="flex gap-0">
              {destinations.map((destination, index) => (
                <CarouselItem
                  key={index}
                  className="pl-0 md:pl-4 cursor-pointer" // Remove padding for the leftmost item
                  style={{ flex: `0 0 ${100 / slidesPerView}%` }}
                >
                  <Card
                    className="overflow-hidden"
                    onClick={(e) => handleCardClick(destination.name, e)}
                  >
                    <div className="relative aspect-[4/3]">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <h2 className="absolute bottom-4 left-4 text-white text-xl sm:text-2xl font-semibold">
                        {destination.name}
                      </h2>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex left-0 sm:-left-12" />
            <CarouselNext className="hidden sm:flex right-0 sm:-right-12" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
