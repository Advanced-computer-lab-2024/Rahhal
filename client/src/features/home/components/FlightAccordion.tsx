import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import FlightCardRoute from "./FlightCardRoute";
import currencyExchange, {
  currencyExchangeDefault,
} from "@/utils/currency-exchange";
import { useCurrencyStore } from "@/stores/currency-exchange-store";
import { Info } from "lucide-react";

import { createBooking } from "@/api-calls/booking-api-calls";
import type {
  FlightOfferDisplay,
  TBookingType,
} from "../types/home-page-types";
import { bookingType } from "@/utils/enums";
import { addLoyalityPoints } from "@/api-calls/users-api-calls";

import { getAirlineLogo } from "@/utils/flight-logo";
import { useState } from "react";
import SignUpModal from "./SignupModal";

import BookingModal from "@/features/home/components/payment-modal/PaymentModal";

interface FlightAccordionProps {
  isAdult: boolean;
  loggedIn: boolean;
  offer: FlightOfferDisplay;
  userID: string;
}

export default function FlightAccordion({
  offer,
  userID,
  isAdult,
  loggedIn,
}: FlightAccordionProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const [isGuestAction, setIsGuestAction] = useState(false);
  const [promocodeDiscount, setPromocodeDiscount] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  const { currency } = useCurrencyStore();
  const convertedPrice = currencyExchange(
    offer.price.currency,
    offer.price.amount
  );
  const displayPrice = convertedPrice ? convertedPrice.toFixed(0) : "N/A";

  const bookingPrice = currencyExchangeDefault(
    offer.price.currency,
    offer.price.amount
  );

  const dbPrice = bookingPrice ? bookingPrice.toFixed(0) : "N/A";

  const onConfirmFlight = async () => {
    if (!loggedIn) {
      setIsGuestAction(true);
      return;
    }
    if (!isModalOpen && userID) {
      setIsModalOpen(true);
      return;
    }

    const bookingRequest: TBookingType = {
      user: userID,
      entity: offer.id,
      type: bookingType.Flight,
      selectedDate: new Date(offer.departure.date),
      discount: promocodeDiscount,
      selectedPrice: isNaN(parseFloat(dbPrice)) ? 0 : parseFloat(dbPrice),
    };
    const booking = await createBooking(bookingRequest);
    if (userID && offer !== null) {
      await addLoyalityPoints(userID, parseFloat(dbPrice));
    }
  };

  const logoPath = getAirlineLogo(offer.airline);
  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      {isGuestAction && (
        <SignUpModal
          onClose={(e) => {
            e.stopPropagation();
            setIsGuestAction(false);
          }}
          text={"Ready to fly? Sign in to book your next flight with ease!"}
        />
      )}

      {isModalOpen && bookingPrice && (
        <BookingModal
          parentBookingFunc={onConfirmFlight}
          currency={currency}
          isOpen={isModalOpen}
          onClose={closeModal}
          price={Number(displayPrice)}
          name={offer.airline}
          type={"Flight"}
          userId={userID}
          egpPrice={bookingPrice}
          setPromocodeDiscount={setPromocodeDiscount}
        />
      )}

      <Accordion type="single" collapsible key={offer.id}>
        <AccordionItem
          value={offer.id}
          className="border-2 rounded-lg overflow-hidden data-[state=open]:border-[var(--primary-color)] "
        >
          <AccordionTrigger className="hover:no-underline [&[data-state=open]>div]:bg-muted [&>svg]:hidden">
            {/* Mobile Layout */}
            <div className="block md:hidden w-full px-4 py-3 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="min-w-16 flex flex-col items-center">
                    {logoPath !== "NA" && isImageLoaded ? (
                      <img
                        src={logoPath}
                        alt={offer.airline}
                        className="h-12 w-12 object-contain"
                        onError={() => setIsImageLoaded(false)}
                      />
                    ) : (
                      <span className="text-center font-semibold text-gray-600 text-xs">
                        {offer.airline}
                      </span>
                    )}
                  </div>
                  <FlightCardRoute
                    departureTime={offer.departure.time}
                    departureCode={offer.departure.code}
                    departureDate={offer.departure.date}
                    arrivalTime={offer.arrival.time}
                    arrivalDate={offer.arrival.date}
                    arrivalCode={offer.arrival.code}
                  />
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{displayPrice}</div>
                  <div className="text-xs text-muted-foreground">
                    {currency}
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between w-full px-6 py-4 transition-colors">
              <div className="flex items-center gap-6 lg:gap-10">
                <div className="min-w-20 lg:min-w-28 flex flex-col items-center">
                  {logoPath !== "NA" && isImageLoaded ? (
                    <img
                      src={logoPath}
                      alt={offer.airline}
                      className="h-16 w-16 lg:h-[5.5rem] lg:w-[5.5rem] object-contain"
                      onError={() => setIsImageLoaded(false)}
                    />
                  ) : (
                    <span className="text-center font-semibold text-gray-600">
                      {offer.airline}
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <FlightCardRoute
                    departureTime={offer.departure.time}
                    departureCode={offer.departure.code}
                    departureDate={offer.departure.date}
                    arrivalTime={offer.arrival.time}
                    arrivalDate={offer.arrival.date}
                    arrivalCode={offer.arrival.code}
                  />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-xl font-bold">{displayPrice}</div>
                  <div className="text-sm text-muted-foreground">
                    {currency}
                  </div>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-4 md:px-6 py-4 bg-muted/50">
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  <div className="md:min-w-28">
                    <div className="text-sm font-medium">Flight Details</div>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="font-medium">
                            {" "}
                            ({offer.departure.code})
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Departure :{" "}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            on : {offer.departure.date}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            at : {offer.departure.time}
                          </div>
                        </div>
                        <div className="md:text-right">
                          <div className="font-medium">
                            ({offer.arrival.code})
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Arrival :{" "}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            on : {offer.arrival.date}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            at : {offer.arrival.time}
                          </div>
                        </div>
                      </div>

                      {offer.stops.length > 0 && (
                        <div className="pt-2">
                          <div className="flex justify-between items-start">
                            <div className="text-sm font-medium mb-2">
                              Stops
                            </div>
                            <div className="text-sm font-medium mb-2">
                              Duration
                            </div>
                          </div>
                          {offer.stops.map((stop, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center py-2 border-t"
                            >
                              <div className="text-sm">{stop.code}</div>
                              <div className="text-sm text-muted-foreground">
                                {stop.duration}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  <div className="md:min-w-28">
                    <div className="text-sm font-medium">Price Details</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        Total fare
                      </div>
                      <div className="font-medium">
                        {currency} {displayPrice.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <Button
                    className="bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] text-black min-w-24 w-full md:w-auto"
                    disabled={!isAdult}
                    onClick={onConfirmFlight}
                  >
                    Confirm Flight
                  </Button>

                  {loggedIn && !isAdult && (
                    <div className="flex items-center gap-2 rounded p-2 text-red-700 text-sm mt-2">
                      <div className="flex items-center justify-center w-5 h-5 text-red rounded-full">
                        <Info className="h-4 w-4" />
                      </div>
                      <span>You must be 18 or older to be able to book</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
