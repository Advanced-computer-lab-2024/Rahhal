import TransportationSearchBar from "./TransportationSearchBar";
import FlightSearchBar from "./FlightSearchBar";

interface TravelPageHeaderProps {
  transferType: string;
  setTransferType: (type: string) => void;
  onIconClickTaxis: () => void;
  onIconClickFlights: () => void;
}
function TravelPageHeader({
  transferType,
  onIconClickFlights,
  onIconClickTaxis,
}: TravelPageHeaderProps) {
  return (
    <div id="searchBar">
      <div className="flex justify-center py-2 md:py-[10px] px-4 md:px-[16px] items-center w-full">
        <div className="w-full max-w-6xl flex justify-center items-center">
          {transferType === "taxis" ? (
            <TransportationSearchBar onIconClick={onIconClickTaxis} />
          ) : transferType === "flights" ? (
            <FlightSearchBar onIconClick={onIconClickFlights} />
          ) : (
            <TransportationSearchBar onIconClick={onIconClickTaxis} />
          )}
        </div>
      </div>
      <hr className="border-t bg-[var(--gray-scale)] " />
    </div>
  );
}

export default TravelPageHeader;
