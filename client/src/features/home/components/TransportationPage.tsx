import { useEffect, useState } from "react";
import { TaxiCard } from "./TaxiCard";
import TaxiRoute from "./TaxiRoute";
import { useSearchBarStore } from "@/stores/transportation-searchbar-slice";
import { createBooking } from "@/api-calls/booking-api-calls";
import type { TBookingType, TransportationData } from "../types/home-page-types";
import { bookingType } from "@/utils/enums";
import { useParams } from "react-router-dom";
import { calculateAge } from "@/utils/age-calculator";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/api-calls/users-api-calls";
import { addLoyalityPoints } from "@/api-calls/users-api-calls";

interface TransportationPageProps {
  data: TransportationData["data"];
  loggedIn: boolean;
}

function TransportationPage({ data, loggedIn }: TransportationPageProps) {
  const [selectedTaxi, setSelectedTaxi] = useState<number | null>(null);
  const { pickupLocation, dropOffLocation } = useSearchBarStore();
  const [isAdult, setAdult] = useState(true);

  const { id } = useParams<{ id: string }>();
  const { data: userData } = useQuery({
    queryKey: ["fetchUser"],
    queryFn: () => getUserById(id ? id : ""),
    enabled: !!id,
  });

  useEffect(() => {
    if (userData) {
      const { dob } = userData;
      if (dob) setAdult(calculateAge(dob) >= 18);
    }
  }, [userData]);

  const onConfirmTrip = async () => {
    const bookingRequest: TBookingType = {
      user: id ? id : "",
      entity: selectedTaxi !== null ? data[selectedTaxi].id : "",
      type: bookingType.Transportation,
    };
    const booking = await createBooking(bookingRequest);
    if (id && selectedTaxi !== null) {
      await addLoyalityPoints(id, parseFloat(data[selectedTaxi].quotation.monetaryAmount));
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

          return (
            <TaxiCard
              key={index}
              type={vehicle.code}
              price={parseFloat(quotation.monetaryAmount)}
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
