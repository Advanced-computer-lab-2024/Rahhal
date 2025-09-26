import { Plane } from "lucide-react";

interface FlightCardRouteProps {
  departureTime: string;
  departureDate: string;
  departureCode: string;
  arrivalTime: string;
  arrivalDate: string;
  arrivalCode: string;
}

export default function FlightCardRoute(props: FlightCardRouteProps) {
  return (
    <>
      <div className="flex items-center gap-2 md:gap-3">
        <div className="flex flex-col items-center">
          <span className="text-base md:text-xl lg:text-2xl font-semibold">
            {props.departureDate}
          </span>
          <span className="text-base md:text-xl lg:text-2xl font-semibold">
            {props.departureTime}
          </span>
          <span className="text-xs md:text-sm text-muted-foreground">
            {props.departureCode}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 md:gap-2 w-20 md:w-32 lg:w-48">
          <div className="flex items-center w-full">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[var(--primary-color)] to-transparent rounded-full" />
          </div>
          <div className="relative">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-[var(--primary-color)] rounded-full flex items-center justify-center shadow-sm">
              <Plane className="size-3 md:size-4 text-white rotate-90" />
            </div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--complimentary-color)] rounded-full animate-pulse" />
          </div>
          <div className="text-xs text-muted-foreground font-medium">
            Direct
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-base md:text-xl lg:text-2xl font-semibold">
            {props.arrivalDate}
          </span>
          <span className="text-base md:text-xl lg:text-2xl font-semibold">
            {props.arrivalTime}
          </span>
          <span className="text-xs md:text-sm text-muted-foreground">
            {props.arrivalCode}
          </span>
        </div>
      </div>
    </>
  );
}
