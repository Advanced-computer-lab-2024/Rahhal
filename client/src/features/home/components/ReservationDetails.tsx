import * as React from "react";
import { addDays, format, isSameMonth, isSameDay, startOfToday, differenceInDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import { cn } from "@/lib/utils";
import GuestSelector from "@/features/home/components/search-bar/counter";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useHotelSearchBarStore } from "@/stores/search-bar-stores/hotel-search-bar-slice";
import { Stepper } from "./search-bar/stepper";
import { Button } from "@/components/ui/button";

interface ReservationProps {
  date: DateRange;
  setDate: (value: DateRange) => void;
}

export default function ReservationDetails({ date, setDate }: ReservationProps) {
  const { checkIn, checkOut, setCheckIn, setCheckOut } = useHotelSearchBarStore();
  const [isOpen, setIsOpen] = useState(false);
  const [activeButton, setActiveButton] = React.useState<"checkIn" | "checkOut">("checkIn");
  const { adults, setAdults, children, setChildren, infants, setInfants } =
    useHotelSearchBarStore();
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (activeButton === "checkIn" && selectedDate) {
      let { to } = date || {};
      if (to && to < (selectedDate || isSameDay(to, selectedDate))) to = undefined;
      const newDate = { from: selectedDate, to } as DateRange;
      setDate(newDate);
      setCheckIn(selectedDate);
      setActiveButton("checkOut");
    } else if (activeButton === "checkOut" && selectedDate) {
      const { from } = date || {};
      const newDate = { from, to: selectedDate } as DateRange;
      setDate(newDate);
      setCheckOut(selectedDate);
      setActiveButton("checkIn");
      setIsOpen(false);
    }
  };

  const handleDateChange = (date: DateRange | undefined) => {
    if (date) {
      setDate(date);
      setCheckIn(date.from);
      setCheckOut(date.to);
    }
  };

  const guestsText = adults + children === 0 ? "" : adults + children === 1 ? "guest" : "guests";
  const infantsText = infants === 0 ? "" : infants === 1 ? "infant" : "infants";

  let displayedText;
  const sum = adults + children + infants;
  if (sum === 0) {
    displayedText = "Add guests";
  } else if (adults + children === 0) {
    displayedText = infants === 0 ? "" : `${infants} ${infantsText}`;
  } else if (infants === 0) {
    displayedText = `${adults + children} ${guestsText}`;
  } else {
    displayedText = `${adults + children} ${guestsText}, ${infants} ${infantsText}`;
  }
  return (
    <div className={cn("grid gap-2 h-fit")}>
      <div className="border rounded-lg w-64 h-fit overflow-hidden border-gray-500">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <div className="flex border-2 border-transparent border-b border-b-gray-500">
              <button className={cn("flex flex-col p-2 border-r border-gray-500 w-1/2")}>
                <span className="text-[0.6rem] font-semibold text-left">CHECK-IN</span>
                {date?.from && (
                  <span className="text-[0.7rem] text-left">{format(date.from, "dd/MM/yyyy")}</span>
                )}
              </button>
              <button className={cn("flex flex-col p-2 w-1/2")}>
                <span className="text-[0.6rem] font-semibold text-left">CHECKOUT</span>
                {date?.to ? (
                  <span className="text-[0.7rem] text-left">{format(date.to, "dd/MM/yyyy")}</span>
                ) : (
                  <span className="text-[0.7rem] text-gray-500 text-left"> Add date </span>
                )}
              </button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="flex w-full justify-between p-5">
              <div className="flex flex-col">
                <span className="font-medium text-lg">
                  {" "}
                  {date.to ? differenceInDays(date.to, date.from!) + " nights" : "Select dates"}
                </span>
                <span className="text-xs text-gray-500">
                  {date.to
                    ? format(date.from!, "MMM d, yyyy") + "-" + format(date.to, "MMM d, yyyy")
                    : ""}{" "}
                </span>
              </div>
              <div className="flex border rounded-lg">
                <button
                  className={cn(
                    "flex flex-col p-2 pr-16 border-2 border-transparent",
                    activeButton === "checkIn" && "border-black rounded-lg",
                  )}
                  onClick={() => setActiveButton("checkIn")}
                >
                  <span className="text-[0.6rem] font-semibold text-left">CHECK-IN</span>
                  {date?.from && (
                    <span className="text-[0.7rem]">{format(date.from, "dd/MM/yyyy")}</span>
                  )}
                </button>
                <button
                  className={cn(
                    "flex flex-col p-2 pr-16 border-2 border-transparent",
                    activeButton === "checkOut" && "border-black rounded-lg",
                  )}
                  onClick={() => setActiveButton("checkOut")}
                >
                  <span className="text-[0.6rem] font-semibold text-left">CHECKOUT</span>
                  {date?.to ? (
                    <span className="text-[0.7rem]">{format(date.to, "dd/MM/yyyy")}</span>
                  ) : (
                    <span className="text-[0.7rem] text-gray-500"> Add date </span>
                  )}
                </button>
              </div>
            </div>

            <Calendar
              classNames={{ row: "flex w-full mt-0.5" }}
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              disabled={(date) => date < new Date()}
              selected={date}
              onSelect={handleDateChange}
              numberOfMonths={2}
              components={{
                Day: ({ date: dayDate, ...props }) => {
                  if (!isSameMonth(dayDate, props.displayMonth)) {
                    return <div className="w-9 h-9" />;
                  }
                  const isFrom = isSameDay(date.from!, dayDate);
                  const isTo = isSameDay(date.to!, dayDate);
                  const isSelected = isFrom || isTo;
                  const isBefore = dayDate < date.from!;
                  const isRange = date.from! < dayDate && date.to! > dayDate;
                  console.log(isSelected);

                  return (
                    <div className={cn("flex justify-center items-center")}>
                      <div
                        className={cn(
                          "absolute top-0 left-0 w-1/2 h-9 ",
                          isRange || isTo ? "bg-accent" : "",
                        )}
                      />

                      <div
                        className={cn(
                          "absolute top-0 right-0 w-1/2 h-9 ",
                          isRange || isFrom ? "bg-accent" : "",
                        )}
                      />

                      <button
                        className={cn(
                          "text-black font-normal w-9 h-9 rounded-full relative z-10 hover:bg-white hover:border hover:border-black",
                          isSelected ? " bg-black text-white hover:bg-black" : "",
                          activeButton == "checkOut" && isBefore
                            ? "hover:border-transparent text-gray-400 line-through "
                            : "",
                        )}
                        onClick={() => handleDateSelect(dayDate)}
                        disabled={activeButton == "checkOut" && (isBefore || isFrom)}
                      >
                        {format(dayDate, "d")}
                      </button>
                    </div>
                  );
                },
              }}
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "focus-visible:outline-0 focus-visible:ring-transparent focus-visible:ring-offset-transparent bg-transparent hover:bg-transparent flex justify-start items-center px-1 relative",
                "text-left font-normal border-none w-full rounded-none h-12 ",
              )}
            >
              <div className="flex flex-col ml-2">
                <span className="text-black text-sm">Who</span>
                <span
                  className={
                    infants + adults + children > 0 ? "text-black text-xs" : "text-gray-500 text-xs"
                  }
                >
                  {displayedText}
                </span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-4 space-y-4 rounded-[8%]">
            <Stepper
              label="Adults"
              description="Ages 13 or above"
              count={adults}
              setCount={setAdults}
            />
            <Stepper
              label="Children"
              description="Ages 2–12"
              count={children}
              setCount={setChildren}
            />
            <Stepper label="Infants" description="Under 2" count={infants} setCount={setInfants} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
