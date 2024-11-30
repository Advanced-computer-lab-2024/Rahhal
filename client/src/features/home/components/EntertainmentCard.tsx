import CardStyles from "../styles/EntertainmentCard.module.css";
import { IoMdStar } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { getPriceValue } from "../utils/price-calculator";
import { useCurrencyStore } from "@/stores/currency-exchange-store";
import currencyExchange from "@/utils/currency-exchange";
import { bookmarkType } from "@/utils/enums";
import CardBookmark from "./bookmarks/CardBookmark";

function formatTimeRange(dateRange: { open: string; close: string }): string {
  const { open, close } = dateRange;

  const formatTime = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(date).toLocaleTimeString("en-US", options);
  };

  const startTime = formatTime(open);
  const endTime = formatTime(close);

  return `${startTime} - ${endTime}`;
}

function formatDate(isoDate: Date): string {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

interface EntertainmentCardProps {
  id: string;
  image: string;
  title: string;
  price:
    | number
    | { min: number; max: number }
    | { foreigner: number; native: number; student: number }
    | { type: string; price: number }[];
  rating: number;
  location?: string;
  languages?: string[];
  openingTime?: { open: string; close: string };
  availability?: boolean;
  seller?: string;
  date?: Date;
  onClick?: () => void;
  entityType: bookmarkType;
}

const EntertainmentCard: React.FC<EntertainmentCardProps> = ({
  id,
  image,
  title,
  price,
  rating,
  location,
  openingTime,
  availability,
  date,
  languages,
  onClick,
  entityType,
}) => {
  const basePrice = getPriceValue(price);
  const { currency } = useCurrencyStore();
  const convertedPrice = currencyExchange("EGP", basePrice);
  const displayPrice = convertedPrice ? convertedPrice.toFixed(0) : "N/A";

  return (
    <div className={CardStyles["entertainment-card-container"]} onClick={onClick}>
      <div className={CardStyles["entertainment-card-container__image"]}>
        <img src={image} alt="entertainment" />
        <CardBookmark id={id} entityType={entityType} />
      </div>
      <div className={CardStyles["entertainment-card-container__details"]}>
        <div className={CardStyles["entertainment-card-container__title-rating"]}>
          <h3 className={CardStyles["entertainment-card-title"]}>{title}</h3>
          <div className={CardStyles["entertainment-card-rating"]}>
            <IoMdStar className={CardStyles["rating-icon"]} />
            <p>{rating?.toPrecision(2)}</p>
          </div>
        </div>

        <div className={CardStyles["entertainment-card-container__booking-price"]}>
          {location && (
            <div className={CardStyles["entertainment-card-container__location"]}>
              <p>
                <FaLocationDot className={CardStyles["location-icon"]} /> {location}
              </p>
            </div>
          )}

          {openingTime && (
            <div className={CardStyles["entertainment-card-container__time"]}>
              <p>{formatTimeRange(openingTime)}</p>
            </div>
          )}

          {languages && (
            <div className={CardStyles["entertainment-card-container__languages"]}>
              <p>Languages: {languages.join(", ")}</p>
            </div>
          )}

          <div className={CardStyles["entertainment-card-availability"]}>
            {availability !== undefined && (
              <p>{availability ? "Available Book NOW!" : "Booking Closed!"}</p>
            )}
          </div>

          {date && (
            <div className={CardStyles["entertainment-card-container__date"]}>
              <p>{formatDate(date)}</p>
            </div>
          )}

          <div className={CardStyles["entertainment-card-price"]}>
            <p>
              From {displayPrice} {currency}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntertainmentCard;
