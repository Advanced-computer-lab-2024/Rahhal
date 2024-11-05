import { useState } from "react";
import { TaxiCard } from "./TaxiCard";
import TaxiRoute from "./TaxiRoute";
import { useSearchBarStore } from "@/stores/transportation-searchbar-slice";
import { createBooking } from "@/api-calls/booking-api-calls";
import type { TBookingType, TransportationData } from "../types/home-page-types";
import { bookingType } from "@/utils/enums";
import { useParams } from "react-router-dom";

interface TransportationPageProps {
  data: TransportationData["data"];
  loggedIn: boolean;
}

function TransportationPage({ data, loggedIn }: TransportationPageProps) {
  const [selectedTaxi, setSelectedTaxi] = useState<number | null>(null);
  const { pickupLocation, dropOffLocation } = useSearchBarStore();

  const { id } = useParams<{ id: string }>();
  const onConfirmTrip = async () => {
    const bookingRequest: TBookingType = {
      user: id ? id : "",
      entity: selectedTaxi !== null ? data[selectedTaxi].id : "",
      type: bookingType.Transportation,
    };
    const booking = await createBooking(bookingRequest);
    if (booking) {
      alert("Trip confirmed successfully!");
    }
  };

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
            onConfirmTrip={onConfirmTrip}
            loggedIn={loggedIn}
          />
        )}
      </div>
    </div>
  );
}

export default TransportationPage;
