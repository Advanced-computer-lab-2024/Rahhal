import React from "react";
import Taxi1 from "@/assets/TaxiProv1.png";
import Taxi2 from "@/assets/TaxiProv2.png";
import Taxi3 from "@/assets/TaxiProv3.png";
import Taxi4 from "@/assets/TaxiProv6.png";
import AirportTaxi from "@/assets/AirportTaxi.jpg";

const providers = [
  { id: 1, src: Taxi1, alt: "Provider 1" },
  { id: 2, src: Taxi2, alt: "Provider 2" },
  { id: 3, src: Taxi3, alt: "Provider 3" },
  { id: 4, src: Taxi4, alt: "Provider 4" },
];

const ProvidersCarouselWithImage = () => {
  return (
    <div className="w-full px-0 sm:px-8 lg:px-16 py-4">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden w-full h-64 sm:h-80 lg:h-96">
        <img
          src={AirportTaxi}
          alt="Explore every destination"
          className="w-full h-full object-cover p-2 rounded-2xl"
        />

        <div className="absolute rounded-lg inset-0 bg-black bg-opacity-40 flex flex-col justify-end items-end px-8 sm:px-16 pb-8 sm:pb-16 m-2">
          <p className="text-white text-lg sm:text-xl font-medium mb-2">
            Start your journey with ease
          </p>
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold text-right">
            Never Miss a Flight
          </h1>
        </div>
      </div>

      {/* Providers Section */}
      <div className="py-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center sm:text-left">
          Our Providers
        </h1>
        <div className="relative w-full flex flex-col justify-center sm:flex-row  sm:justify-start gap-6">
          {providers.map((provider, index) => (
            <div
              key={index}
              className="min-w-36 h-16 rounded-md flex items-center justify-center"
            >
              <img
                src={provider.src}
                alt={provider.alt}
                className="object-contain max-w-[200px]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProvidersCarouselWithImage;
