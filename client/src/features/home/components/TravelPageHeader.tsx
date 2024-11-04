import { Button } from "@/components/ui/button";
import TransportationSearchBar from "./TransportationSearchBar";
//import TravelSearchBar from "./TravelSearchBar";

interface TravelPageHeaderProps {
  transferType: string;
  setTransferType: (type: string) => void;
  onIconClickTaxis: () => void;
}
function TravelPageHeader({
  transferType,
  setTransferType,
  onIconClickTaxis,
}: TravelPageHeaderProps) {
  return (
    <>
      <div className="flex justify-between p-10 items-center w-[100%]">
        {transferType === "taxis" ? (
          <TransportationSearchBar onIconClick={onIconClickTaxis} />
        ) : transferType === "flights" ? (
          <TransportationSearchBar onIconClick={onIconClickTaxis} />
        ) : (
          <TransportationSearchBar onIconClick={onIconClickTaxis} />
        )}
        <div>
          <Button className="ml-4" onClick={() => setTransferType("taxis")}>
            Taxis
          </Button>
          <Button className="ml-4" onClick={() => setTransferType("flights")}>
            Flights
          </Button>
          <Button className="ml-4" onClick={() => setTransferType("buses")}>
            Buses
          </Button>
        </div>
      </div>
    </>
  );
}

export default TravelPageHeader;
