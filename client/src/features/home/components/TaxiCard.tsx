import Van from "@/assets/Van.png";
import Car from "@/assets/Car.png";
import { GoPerson } from "react-icons/go";
import { MdOutlineLuggage } from "react-icons/md";
import { useCurrencyStore } from "@/stores/currency-exchange-store";
import currencyExchange from "@/utils/currency-exchange";
interface TaxiCardProps {
  type?: string;
  price: number;
  originalCurrency: string;
  guests?: number;
  luggage?: number;
  provider?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const TaxiCard: React.FC<TaxiCardProps> = (props) => {
  const { currency } = useCurrencyStore();
  const convertedPrice = currencyExchange(props.originalCurrency, props.price);
  const displayPrice = convertedPrice ? convertedPrice.toFixed(0) : "N/A";

  return (
    <div
      className={`
        bg-white rounded-lg shadow-md border-2 p-3 md:p-4 cursor-pointer transition-all duration-300 hover:shadow-lg
        ${props.isSelected ? "border-[var(--primary-color)] transform scale-[1.02]" : "border-transparent hover:border-gray-200"}
      `}
      onClick={() => props.onClick && props.onClick()}
    >
      <div className="flex justify-between items-center h-full w-full">
        {/* Left side - Vehicle image and details */}
        <div className="flex items-center flex-1 min-w-0">
          {/* Vehicle Image */}
          <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 mr-3 md:mr-4">
            <img
              src={props.type && props.type.includes("CAR") ? Car : Van}
              alt={props.type && props.type.includes("CAR") ? "Car" : "Van"}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Vehicle Details */}
          <div className="flex flex-col min-w-0 flex-1">
            <h3 className="text-base md:text-lg font-semibold text-black truncate">
              {props.type && props.type.includes("CAR")
                ? "Standard Car"
                : "Van"}
            </h3>
            <p className="text-sm md:text-base text-gray-700 font-medium">
              {currency} {displayPrice}
            </p>
            {props.provider && (
              <div className="w-8 h-4 md:w-10 md:h-5 mt-1">
                <img
                  src={props.provider}
                  alt="Provider"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right side - Passenger and luggage info */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-end md:items-center ml-2 flex-shrink-0">
          <div className="flex items-center text-sm md:text-base whitespace-nowrap">
            <GoPerson className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-600" />
            <span className="hidden sm:inline text-gray-700">
              Up to {props.guests ? props.guests : 10}
            </span>
            <span className="sm:hidden text-gray-700">
              {props.guests ? props.guests : 10}
            </span>
          </div>
          <div className="flex items-center text-sm md:text-base whitespace-nowrap">
            <MdOutlineLuggage className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-600" />
            <span className="hidden sm:inline text-gray-700">
              {props.luggage ? props.luggage : 0} suitcases
            </span>
            <span className="sm:hidden text-gray-700">
              {props.luggage ? props.luggage : 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
