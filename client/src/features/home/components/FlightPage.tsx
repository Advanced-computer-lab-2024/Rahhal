import { useState } from "react";
import { createBooking } from "@/api-calls/booking-api-calls";
import type { FlightData, TBookingType } from "../types/home-page-types";
import { bookingType } from "@/utils/enums";
import { addLoyalityPoints } from "@/api-calls/users-api-calls";
import { useFlightSearchBarStore } from "@/stores/flight-searchbar-slice";
import { useCurrencyStore } from "@/stores/currency-exchange-store";
import FlightCard from "./FlightCard";
import currencyExchange from "@/utils/currency-exchange";

interface TransportationPageProps {
  data: FlightData["data"];
  loggedIn: boolean;
  id?: string;
  isAdult?: boolean;
}

function FlightPage({ data, loggedIn, id, isAdult }: TransportationPageProps) {
  const [selectedFlight, setSelectedFlight] = useState<number | null>(null);
  const [prices, setPrices] = useState<number[]>([]);

  const { currency } = useCurrencyStore();

  const onConfirmTrip = async () => {
    const bookingRequest: TBookingType = {
      user: id ? id : "",
      entity: selectedFlight !== null ? data[selectedFlight]?.offers?.id || "" : "",
      type: bookingType.Flight,
    };
    const booking = await createBooking(bookingRequest);
    if (id && selectedFlight !== null) {
      const convertedPrice = currencyExchange("EGP", prices[selectedFlight]);
      if (convertedPrice !== undefined) {
        await addLoyalityPoints(id, convertedPrice);
      }
    }
    if (booking) {
      alert("Flight booked successfully!");
    }
  };

  return (
    <div className="w-[100%] flex">
      <div className="w-[60%] flex flex-col p-10 gap-8">{JSON.stringify(data)}</div>
    </div>
  );
}

export default FlightPage;
