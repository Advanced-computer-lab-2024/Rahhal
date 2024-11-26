import hotel from "./Hotels.jpg";

("use client");

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import { fetchHotels } from "@/api-calls/hotel-api-calls";
import { useHotelStore } from "@/stores/hotel-store";
import HotelCard from "../HotelCard";
import { Skeleton } from "@/components/ui/skeleton";



export default function HotelsLandingComponent() {
  const [loading, setLoading] = useState<boolean>(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [slidesPerView, setSlidesPerView] = useState(1);
  const { hotels, setHotels } = useHotelStore();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newHotels = await fetchHotels("Egypt");
        setHotels(newHotels);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full px-0 sm:px-8 lg:px-16 py-4">
      {/* Hero Section */}

      <div className="relative rounded-xl overflow-hidden w-full h-64 sm:h-80 lg:h-96">
        <img src={hotel} alt="Explore every destination" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start px-8 sm:px-16 space-y-4">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Feel at Home, Anywhere You Go
          </h1>
          <p className="text-white text-base sm:text-lg font-light">
            Latest reviews. Lowest prices.
          </p>
          <button className="mt-4 px-6 py-2 bg-[var(--complimentary-color)] hover:bg-[var(--complimentary-color-dark)] text-white text-sm sm:text-base font-semibold rounded-lg shadow-lg cursor-pointer">
            Search Now
          </button>
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
              {loading
                ? Array.from({ length: slidesPerView }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-0 md:pl-4 cursor-pointer"
                      style={{ flex: `0 0 ${100 / slidesPerView}%` }}
                    >
                      <div className="flex flex-col gap-4 w-full h-[24rem] justify-center">
                        <Skeleton className="w-full h-[24rem]" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-64" />
                        </div>
                      </div>
                    </CarouselItem>
                  ))
                : hotels.map((hotel, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-0 md:pl-4 cursor-pointer"
                      style={{ flex: `0 0 ${100 / slidesPerView}%` }}
                    >
                      <HotelCard hotel={hotel} index={index} />
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
