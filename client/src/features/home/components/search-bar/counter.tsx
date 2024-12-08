import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IoCloseOutline } from "react-icons/io5";
import { Stepper } from "./stepper";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface GuestSelectorProps {
  adults: number;
  setAdults: (value: number) => void;
  children: number;
  setChildren: (value: number) => void;
  infants: number;
  setInfants: (value: number) => void;
  placeholder: string;
  className?: string;
  index?: number;
  corner?: number;
  setFocusIndex?: (focusIndex: number) => void;
  focusIndex?: number;
  setHoverIndex?: (hoverIndex: number) => void;
  hoverIndex?: number;
}

function GuestSelector({
  adults,
  setAdults,
  children,
  setChildren,
  infants,
  setInfants,
  placeholder,
  className = "",
  index,
  setFocusIndex,
  focusIndex,
  setHoverIndex,
  hoverIndex,
  corner,
}: GuestSelectorProps) {
  const [open, setOpen] = useState(false);
  const sum = adults + children + infants;
  let displayedText;
  let guestsText;

  if (!open && focusIndex === index && setFocusIndex) {
    setFocusIndex(0); // Reset focus when the popover closes
  } else if (open && focusIndex !== index && setFocusIndex) {
    setFocusIndex(index ? index : 0); // Set focus when the popover opens
  }

  if (placeholder === "Guests" || placeholder === "guests")
    guestsText = adults + children === 0 ? "" : adults + children === 1 ? "guest" : "guests";
  else
    guestsText =
      adults + children === 0 ? "" : adults + children === 1 ? "passenger" : "passengers";

  const infantsText = infants === 0 ? "" : infants === 1 ? "infant" : "infants";

  if (sum === 0) {
    displayedText = "Add " + placeholder;
  } else if (adults + children === 0) {
    displayedText = infants === 0 ? "" : `${infants} ${infantsText}`;
  } else if (infants === 0) {
    displayedText = `${adults + children} ${guestsText}`;
  } else {
    displayedText = `${adults + children} ${guestsText}, ${infants} ${infantsText}`;
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAdults(0);
    setChildren(0);
    setInfants(0);
  };

  return (
    <>
      <div
        className={cn(
          "flex items-center px-0 relative",
          focusIndex === 1 && hoverIndex === 2
            ? index === 1
              ? "bg-gray-300/65"
              : index === 2
                ? "bg-gray-300/65 rounded-r-full"
                : ""
            : focusIndex === corner && hoverIndex === (corner ? corner - 1 : 0 - 1)
              ? index === corner
                ? "bg-gray-300/65"
                : index === (corner ? corner - 1 : 0 - 1)
                  ? "bg-gray-300/65 rounded-l-full"
                  : ""
              : focusIndex != 0 &&
                  focusIndex != 1 &&
                  focusIndex != corner &&
                  (hoverIndex ? hoverIndex : 0) - 1 === focusIndex
                ? index === hoverIndex
                  ? "bg-gray-300/65 rounded-r-full"
                  : index === focusIndex
                    ? "bg-gray-300/65 rounded-l-full"
                    : ""
                : focusIndex != 0 &&
                    focusIndex != 1 &&
                    focusIndex != corner &&
                    (hoverIndex ? hoverIndex : 0) + 1 === focusIndex
                  ? index === hoverIndex
                    ? "bg-gray-300/65 rounded-l-full"
                    : index === focusIndex
                      ? "bg-gray-300/65 rounded-r-full"
                      : ""
                  : "",
        )}
      >
        <div
          className={cn(
            "rounded-full focus-within:bg-background focus-within:shadow-sm h-[66px] flex items-center relative",
            focusIndex != index
              ? hoverIndex == index && (index == focusIndex! - 1 || index == focusIndex! + 1)
                ? ""
                : "hover:bg-gray-300/65 z-0"
              : focusIndex === index
                ? "bg-background z-10 shadow-[rgba(0,_0,_0,_0.15)_0px_0px_6px]"
                : "",
          )}
        >
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className={cn(
                  "border-0 focus-visible:outline-0 focus-visible:ring-transparent focus-visible:ring-offset-transparent bg-transparent hover:bg-transparent flex justify-start items-center px-2 w-40 py-0 relative",
                  "w-[200px] h-[66px] justify-start text-left font-normal rounded-full border-none " +
                    className,
                )}
                onMouseEnter={() => setHoverIndex && setHoverIndex(index || 0)}
                onMouseLeave={() => setHoverIndex && setHoverIndex(0)}
              >
                <div className="flex flex-col ml-2">
                  <span className="text-black text-sm">Who</span>
                  <span className={sum > 0 ? "text-black text-xs" : "text-gray-500 text-xs"}>
                    {displayedText}
                  </span>
                </div>
                {adults + children + infants > 0 && open && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black rounded-md hover:rounded-full text-lg transition-all duration-300 hover:bg-gray-300 w-6 h-6 flex items-center justify-center"
                    onClick={handleClear}
                    aria-label="Clear Passengers"
                  >
                    <IoCloseOutline />
                  </Button>
                )}
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
              <Stepper
                label="Infants"
                description="Under 2"
                count={infants}
                setCount={setInfants}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
}

export default GuestSelector;
