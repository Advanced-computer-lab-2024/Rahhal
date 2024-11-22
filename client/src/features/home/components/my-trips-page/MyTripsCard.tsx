import MyTripStyles from "@/features/home/styles/MyTripsCard.module.css";
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
    <div className={MyTripStyles["card-container"]} onClick={onClick}>
      <div className={MyTripStyles["trip-details"]}>
        <div className={MyTripStyles["trip-details_image-container"]}>
          <img
            src={image ? image : unAvaialableImage}
            className={MyTripStyles["trip-details_image-container_image"]}
            alt="felluca"
          />
        </div>

        <div className={MyTripStyles["trip-details_data"]}>
          <p>{title}</p>
          <p>{date}</p>
          <p
            className={
              status === "upcoming"
                ? MyTripStyles.statusUpcoming
                : status === "cancelled"
                  ? MyTripStyles.statusCanceled
                  : status === "completed"
                    ? MyTripStyles.statusCompleted
                    : ""
            }
          >
            {status}
          </p>
        </div>
      </div>
      <div className={MyTripStyles["trip-price-container"]}>
        <div className={MyTripStyles["trip-price-container_text-icon"]}>
          <p>
            {currency} {displayPrice}
          </p>
          <IoMdMore />
        </div>
      </div>
    </div>
  );
};
