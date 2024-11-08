"use client";

import { ArrowRight, Info, MapPin, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import PaymentOptions from "@/components/PaymentOptions";

interface RouteCardProps {
  departure: string;
  destination: string;
  amount: string;
  currency: string;
  serviceProvider: string;
  cancellationRule?: string;
  carType: string;
  onConfirmTrip: () => void;
  loggedIn: boolean;
  isAdult?: boolean;
}

function TaxiRoute({
  departure,
  destination,
  amount,
  currency,
  serviceProvider,
  cancellationRule,
  carType,
  onConfirmTrip,
  loggedIn,
  isAdult,
}: RouteCardProps) {
  return (
    <Card
      className={`w-full max-w-md mx-auto transition-all duration-500 ease-in-out scale-95 opacity-0"}`}
    >
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
        <CardTitle className="text-xl sm:text-2xl font-bold">Trip Route</CardTitle>
        <div className="flex items-center text-xl sm:text-2xl font-bold text-[#E1BC6D]">
          <span>
            {currency + " "}
            {amount}
          </span>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="relative flex items-center">
          <svg
            className="absolute left-4 sm:left-6 w-[calc(100%-32px)] sm:w-[calc(100%-48px)] h-16 sm:h-20"
            aria-hidden="true"
          >
            <line
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="#E1BC6D"
              strokeDasharray="4 4"
              className="opacity-50"
            />
          </svg>
          <div className="relative z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E1BC6D] bg-opacity-20 border-2 border-[#E1BC6D]">
            <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-black" aria-hidden="true" />
          </div>
          <div className="grow" />
          <div className="relative z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E1BC6D] bg-opacity-20 border-2 border-[#E1BC6D]">
            <Navigation className="h-5 w-5 sm:h-6 sm:w-6 text-black" aria-hidden="true" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm">
          <div>
            <p className="font-medium">Departure</p>
            <p className="text-muted-foreground">{departure}</p>
          </div>
          <div className="sm:text-right">
            <p className="font-medium">Destination</p>
            <p className="text-muted-foreground">{destination}</p>
          </div>
        </div>
        <p></p>
        <div>
          <p className="font-medium">Car Type</p>
          <p className="text-muted-foreground">{carType}</p>
        </div>
        <div>
          <p className="font-medium">Service Provider</p>
          <p className="text-muted-foreground">{serviceProvider}</p>
        </div>
        <div>
          <p className="font-medium">Cancellation Policy</p>
          <p className="text-muted-foreground">{cancellationRule}</p>
        </div>
        <PaymentOptions />
      </CardContent>
      <CardFooter className="flex flex-col justify-center">
        <Button
          size="sm"
          className={cn(
            "px-4 sm:px-8 py-2 sm:py-3 text-black text-sm sm:text-base",
            loggedIn
              ? "bg-[#E1BC6D] hover:bg-[#c9a75f]"
              : "bg-[#E1BC6D] opacity-50 cursor-not-allowed pointer-events-none",
          )}
          onClick={onConfirmTrip}
          disabled={!loggedIn || !isAdult}
        >
          <ArrowRight className="mr-2 h-4 w-4" /> Confirm Trip
        </Button>
        {loggedIn && !isAdult && (
          <div className=" flex items-center gap-2 rounded p-2 text-red-700 text-sm">
            <div className="flex items-center justify-center w-5 h-5 text-red rounded-full">
              <Info className="h-4 w-4" />
            </div>
            <span>You must be 18 or older to be able to book</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
export default TaxiRoute;
