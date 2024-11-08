import { useState } from "react";
import { TaxiCard } from "./TaxiCard";
import TaxiRoute from "./TaxiRoute";
import { useSearchBarStore } from "@/stores/transportation-searchbar-slice";
import { createBooking } from "@/api-calls/booking-api-calls";
import type { TBookingType, TransportationData } from "../types/home-page-types";
import { bookingType } from "@/utils/enums";
import { addLoyalityPoints } from "@/api-calls/users-api-calls";
import { useCurrencyStore } from "@/stores/currency-exchange-store";
import currencyExchange from "@/utils/currency-exchange";
import { set } from "lodash";

interface TransportationPageProps {
  data: TransportationData["data"];
  loggedIn: boolean;
  id?: string;
  isAdult?: boolean;
}

function TransportationPage({ data, loggedIn, id, isAdult }: TransportationPageProps) {
  const [selectedTaxi, setSelectedTaxi] = useState<number | null>(null);
  const [prices, setPrices] = useState<number[]>([]);

  const { pickupLocation, dropOffLocation } = useSearchBarStore();
  const { currency } = useCurrencyStore();

  const onConfirmTrip = async () => {
    const bookingRequest: TBookingType = {
      user: id ? id : "",
      entity: selectedTaxi !== null ? data[selectedTaxi].id : "",
      type: bookingType.Transportation,
    };
    const booking = await createBooking(bookingRequest);
    if (id && selectedTaxi !== null) {
      const convertedPrice = currencyExchange("EGP", prices[selectedTaxi]);
      if (convertedPrice !== undefined) {
        await addLoyalityPoints(id, convertedPrice);
      }
    }
    if (booking) {
      alert("Trip confirmed successfully!");
    }
  };

  return (
    <div className="w-[100%] flex">
      <div className="w-[60%] flex flex-col p-10 gap-8">
        {data.map((offer, index) => {
          const { vehicle, serviceProvider, quotation } = offer;

          const convertedPrice = currencyExchange(
            offer.quotation.currencyCode,
            parseFloat(quotation.monetaryAmount),
          );
          const displayPrice = convertedPrice ? convertedPrice.toFixed(0) : "N/A";

          setPrices([...prices, convertedPrice ? convertedPrice : 0]);

          return (
            <TaxiCard
              key={index}
              type={vehicle.code}
              price={displayPrice}
              currency={currency}
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
            amount={prices[selectedTaxi] ? prices[selectedTaxi].toFixed(0) : "N/A"}
            currency={data[selectedTaxi].quotation.currencyCode}
            departure={pickupLocation[0]}
            destination={dropOffLocation[0]}
            serviceProvider={data[selectedTaxi].serviceProvider.name}
            cancellationRule={data[selectedTaxi].cancellationRules[0].ruleDescription}
            carType={data[selectedTaxi].vehicle.description}
            onConfirmTrip={onConfirmTrip}
            loggedIn={loggedIn}
            isAdult={isAdult}
          />
        )}
      </div>
    </div>
  );
}

export default TransportationPage;
