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
      <div className="flex justify-between p-10 items-center w-[100%]">
        {transferType === "taxis" ? (
          <TransportationSearchBar onIconClick={onIconClickTaxis} />
        ) : transferType === "flights" ? (
          <FlightSearchBar onIconClick={onIconClickFlights} />
        ) : (
          <TransportationSearchBar onIconClick={onIconClickTaxis} />
        )}
        <div className="flex justify-center">
          <Button
            className={`ml-2 rounded-full bg-transparent text-black hover:bg-gray-200 px-6 py-3 text-md ${transferType === "taxis" && "bg-gray-200"} `}
            onClick={() => setTransferType("taxis")}
          >
            <PiTaxi className="mr-2" size={20} />
            Airport taxis
          </Button>
          <Button
            className={`ml-2 rounded-full bg-transparent text-black hover:bg-gray-200 px-6 py-3 text-md ${transferType === "flights" && "bg-gray-200"} `}
            onClick={() => setTransferType("flights")}
          >
            <img src={flightIcon} className="mr-2 w-7 h-7" />
            Flights
          </Button>
          <Button
            className={`ml-2 rounded-full bg-transparent text-black  hover:bg-gray-200 px-6 py-3 text-md  ${transferType === "buses" && "bg-gray-200"} `}
            onClick={() => setTransferType("buses")}
          >
            <img src={busIcon} className="mr-2 w-7 h-7" />
            Buses
          </Button>
        </div>
      </div>
    </>
  );
}

export default TravelPageHeader;
