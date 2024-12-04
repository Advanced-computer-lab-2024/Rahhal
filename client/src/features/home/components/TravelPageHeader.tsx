import { Button } from "@/components/ui/button";
import { PiTaxi } from "react-icons/pi";
import flightIcon from "@/assets/flight-Icon.png";
import busIcon from "@/assets/Bus Icon.png";
import TransportationSearchBar from "./TransportationSearchBar";
import FlightSearchBar from "./FlightSearchBar";
//import TravelSearchBar from "./TravelSearchBar";

interface TravelPageHeaderProps {
  transferType: string;
  setTransferType: (type: string) => void;
  onIconClickTaxis: () => void;
  onIconClickFlights: () => void;
}
function TravelPageHeader({
  transferType,
  setTransferType,
  onIconClickFlights,
  onIconClickTaxis,
}: TravelPageHeaderProps) {
  return (
    <>
      <div className="flex justify-center py-[10px] px-[16px] items-center w-[100%] ">
        {transferType === "taxis" ? (
          <TransportationSearchBar onIconClick={onIconClickTaxis} />
        ) : transferType === "flights" ? (
          <FlightSearchBar onIconClick={onIconClickFlights} />
        ) : (
          <TransportationSearchBar onIconClick={onIconClickTaxis} />
        )}
       
      </div>
      <hr className="border-t bg-[var(--gray-scale)] " />
    </>
  );
}

export default TravelPageHeader;
