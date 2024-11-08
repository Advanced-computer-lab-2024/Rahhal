import type { FlightData } from "../types/home-page-types";
import { parseFlightOfferData } from "@/lib/utils";
import FlightAccordion from "./FlightAccordion";

interface TransportationPageProps {
  rawData: FlightData;
  loggedIn: boolean;
  userId: string;
  isAdult: boolean;
}

function FlightPage({ rawData, loggedIn, userId, isAdult }: TransportationPageProps) {
  const { data, dictionaries } = rawData;

  return (
    <div className="w-full flex">
      <div className="w-[60%] flex flex-col p-10 gap-8">
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
