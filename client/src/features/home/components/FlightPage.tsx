import type { FlightData } from "../types/home-page-types";
import { parseFlightOfferData } from "@/lib/utils";
import FlightAccordion from "./FlightAccordion";

interface TransportationPageProps {
  rawData: FlightData;
  loggedIn: boolean;
  userId: string;
  isAdult: boolean;
}

function FlightPage({
  rawData,
  loggedIn,
  userId,
  isAdult,
}: TransportationPageProps) {
  const { data, dictionaries } = rawData;

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-6xl flex flex-col p-4 md:p-6 lg:p-10 gap-4 md:gap-6 lg:gap-8">
        {data.map((offer, index) => {
          const parsedOffer = parseFlightOfferData(offer, dictionaries);
          return (
            <FlightAccordion
              key={index}
              isAdult={isAdult}
              loggedIn={loggedIn}
              offer={parsedOffer}
              userID={userId}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FlightPage;
