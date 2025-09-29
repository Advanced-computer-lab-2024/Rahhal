import unAvaialableImage from "@/assets/imageNotavail.png";
import { useCurrencyStore } from "@/stores/currency-exchange-store";
import currencyExchange from "@/utils/currency-exchange";
import { IoMdMore } from "react-icons/io";

interface MyTripsCardProps {
  image?: string;
  title?: string;
  price: number;
  date?: string;
  status?: string;
  onClick?: () => void;
}

export const MyTripsCard: React.FC<MyTripsCardProps> = ({
  image,
  title,
  price,
  date,
  status,
  onClick,
}) => {
  const { currency } = useCurrencyStore();
  const convertedPrice = currencyExchange("EGP", price);
  const displayPrice = convertedPrice ? convertedPrice.toFixed(0) : "N/A";

  return (
    <div
      className="w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer p-4 md:p-6"
      onClick={onClick}
    >
      {/* Mobile Layout - Vertical Stack */}
      <div className="flex flex-col sm:hidden space-y-4">
        {/* Image */}
        <div className="w-full h-48 flex-shrink-0">
          <img
            src={image ? image : unAvaialableImage}
            className="w-full h-full object-cover rounded-md"
            alt={title || "trip"}
          />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          <h3 className="text-lg font-bold text-black truncate">{title}</h3>
          <p className="text-sm text-gray-600">{date}</p>
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-medium uppercase ${
                status === "upcoming"
                  ? "text-green-600"
                  : status === "cancelled"
                    ? "text-red-600"
                    : status === "completed"
                      ? "text-gray-500"
                      : ""
              }`}
            >
              {status}
            </span>
            <div className="flex items-center space-x-2 text-lg font-semibold">
              <span>
                {currency} {displayPrice}
              </span>
              <IoMdMore className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Tablet & Desktop Layout - Horizontal */}
      <div className="hidden sm:flex items-center justify-between">
        {/* Left side - Image and Details */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          {/* Image */}
          <div className="w-24 h-16 md:w-32 md:h-20 flex-shrink-0">
            <img
              src={image ? image : unAvaialableImage}
              className="w-full h-full object-cover rounded-md"
              alt={title || "trip"}
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 space-y-1">
            <h3 className="text-base md:text-lg font-bold text-black truncate">
              {title}
            </h3>
            <p className="text-sm text-gray-600">{date}</p>
            <span
              className={`inline-block text-xs font-medium uppercase ${
                status === "upcoming"
                  ? "text-green-600"
                  : status === "cancelled"
                    ? "text-red-600"
                    : status === "completed"
                      ? "text-gray-500"
                      : ""
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        {/* Right side - Price and Actions */}
        <div className="flex items-center space-x-3 ml-4">
          <span className="text-lg md:text-xl font-semibold text-black whitespace-nowrap">
            {currency} {displayPrice}
          </span>
          <IoMdMore className="text-gray-400 text-xl flex-shrink-0" />
        </div>
      </div>
    </div>
  );
};
