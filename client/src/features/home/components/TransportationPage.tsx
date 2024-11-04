import { useState } from "react";
import { TaxiCard } from "./TaxiCard";
import TaxiRoute from "./TaxiRoute";
import { useSearchBarStore } from "@/stores/transportation-searchbar-slice";

interface CancellationRule {
  ruleDescription: string;
}
interface Vehicle {
  code: string;
  category: string;
  description: string;
  imageURL?: string;
  baggages?: { count: number }[];
  seats?: { count: number }[];
}

interface ServiceProvider {
  code: string;
  name: string;
  logoUrl?: string;
}

interface Quotation {
  monetaryAmount: string;
  currencyCode: string;
}

interface TransportationPageProps {
  data: {
    vehicle: Vehicle;
    serviceProvider: ServiceProvider;
    quotation: Quotation;
    cancellationRules: CancellationRule[];
  }[];
}

function TransportationPage({ data }: TransportationPageProps) {
  const [selectedTaxi, setSelectedTaxi] = useState<number | null>(null);
  const [isCardSelected, S] = useState(false);
  const { pickupLocation, dropOffLocation } = useSearchBarStore();

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
              currency={quotation.currencyCode}
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
            currency={data[selectedTaxi].quotation.currencyCode}
            departure={pickupLocation[0]}
            destination={dropOffLocation[0]}
            serviceProvider={data[selectedTaxi].serviceProvider.name}
            cancellationRule={data[selectedTaxi].cancellationRules[0].ruleDescription}
            carType={data[selectedTaxi].vehicle.description}
          />
        )}
      </div>
    </div>
  );
}

export default TransportationPage;
