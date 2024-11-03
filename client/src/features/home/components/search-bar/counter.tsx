import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Stepper } from "./stepper";

interface GuestSelectorProps {
  adults: number;
  setAdults: (value: number) => void;
  children: number;
  setChildren: (value: number) => void;
  infants: number;
  setInfants: (value: number) => void;
  placeholder: string;
}

function GuestSelector({
  adults,
  setAdults,
  children,
  setChildren,
  infants,
  setInfants,
  placeholder,
}: GuestSelectorProps) {
  const sum = adults + children + infants;
  let displayedText;
  let guestsText;

  if (placeholder === "Guests")
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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[200px] h-[66px] justify-start text-left font-normal rounded-full border-none"
        >
          <div className="flex flex-col">
            <span className="text-black text-sm">Who</span>
            <span className={sum > 0 ? "text-black text-xs" : "text-gray-500 text-xs"}>
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
        <Stepper label="Children" description="Ages 2–12" count={children} setCount={setChildren} />
        <Stepper label="Infants" description="Under 2" count={infants} setCount={setInfants} />
      </PopoverContent>
    </Popover>
  );
}

export default GuestSelector;
