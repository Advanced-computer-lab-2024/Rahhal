import { Users, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Stepper } from "./stepper";

interface GuestSelectorMobileProps {
  title: string;
  placeholder: string;
  adults: number;
  setAdults: (value: number) => void;
  children: number;
  setChildren: (value: number) => void;
  infants: number;
  setInfants: (value: number) => void;
}

export function GuestSelectorMobile({
  title,
  placeholder,
  adults,
  setAdults,
  children,
  setChildren,
  infants,
  setInfants,
}: GuestSelectorMobileProps) {
  const [showSelector, setShowSelector] = useState(false);

  const totalGuests = adults + children + infants;

  const getDisplayText = () => {
    if (totalGuests === 0) {
      return placeholder || "Add guests";
    }

    const parts: string[] = [];
    const totalGuestsExcludingInfants = adults + children;

    if (totalGuestsExcludingInfants > 0) {
      const guestText = totalGuestsExcludingInfants === 1 ? "guest" : "guests";
      parts.push(`${totalGuestsExcludingInfants} ${guestText}`);
    }

    if (infants > 0) {
      const infantText = infants === 1 ? "infant" : "infants";
      parts.push(`${infants} ${infantText}`);
    }

    return parts.join(", ");
  };

  const handleClear = () => {
    setAdults(0);
    setChildren(0);
    setInfants(0);
  };

  if (showSelector) {
    return (
      <div className="bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSelector(false)}
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
          </Button>
          <h3 className="font-medium">{title}</h3>
          {totalGuests > 0 && (
            <Button variant="ghost" size="sm" onClick={handleClear}>
              Clear
            </Button>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
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
        </div>

        {/* Done Button */}
        <div className="p-4 border-t border-gray-100 bg-white fixed bottom-0 left-0 right-0">
          <Button
            onClick={() => setShowSelector(false)}
            className="w-full h-12 bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)]"
          >
            Done
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => setShowSelector(true)}
    >
      <div className="flex items-center flex-1">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
          <Users className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <div className="font-medium text-gray-900">{title}</div>
          <div
            className={cn(
              "text-sm",
              totalGuests > 0 ? "text-gray-900" : "text-gray-500"
            )}
          >
            {getDisplayText()}
          </div>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </div>
  );
}
