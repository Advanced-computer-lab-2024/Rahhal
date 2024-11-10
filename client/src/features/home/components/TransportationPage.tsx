import { useState } from "react";
import { TaxiCard } from "./TaxiCard";
import TaxiRoute from "./TaxiRoute";
import { useSearchBarStore } from "@/stores/transportation-searchbar-slice";
import type { TransportationData } from "../types/home-page-types";

interface TransportationPageProps {
  data: TransportationData["data"];
  loggedIn: boolean;
  id?: string;
  isAdult?: boolean;
}

function TransportationPage({ data, loggedIn, id, isAdult }: TransportationPageProps) {
  const [selectedTaxi, setSelectedTaxi] = useState<number | null>(null);

  const { selectedPickupLocation, selectedDropOffLocation } = useSearchBarStore();

  return (
    <div className="w-[100%] flex">
      <div className="w-[60%] flex flex-col p-10 gap-8">
        {data.map((offer, index) => {
          const { vehicle, serviceProvider, quotation } = offer;
          return (
            <TaxiCard
              key={index}
              type={vehicle.code}
              price={parseFloat(quotation.monetaryAmount)}
              originalCurrency={quotation.currencyCode}
              guests={vehicle.seats ? vehicle.seats[0].count : undefined}
              luggage={vehicle.baggages ? vehicle.baggages[0].count : undefined}
              provider={serviceProvider.logoUrl}
              isSelected={selectedTaxi === index}
              onClick={() => setSelectedTaxi(index)}
            />
          );
        })}
      </div>
      <div className="p-10">
        {selectedTaxi !== null && (
          <TaxiRoute
            amount={parseFloat(data[selectedTaxi].quotation.monetaryAmount)}
            originalCurrency={data[selectedTaxi].quotation.currencyCode}
            departure={selectedPickupLocation}
            destination={selectedDropOffLocation}
            serviceProvider={data[selectedTaxi].serviceProvider.name}
            cancellationRule={data[selectedTaxi].cancellationRules[0].ruleDescription}
            carType={data[selectedTaxi].vehicle.description}
            selectedTaxi={data[selectedTaxi]}
            userID={id ? id : ""}
            loggedIn={loggedIn}
            isAdult={isAdult}
          />
        )}
      </div>
    </div>
  );
}

export default TransportationPage;
