import CardStyles from "../styles/EntertainmentCard.module.css";
import { IoMdStar } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { GrLanguage } from "react-icons/gr";
import { getPriceValue } from "./GeneralGridView";
import { useCurrencyStore } from "@/stores/currency-exchange-store";
import currencyExchange from "@/utils/currency-exchange";
interface EntertainmentCardProps {
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
  onClick?: () => void;
}

const EntertainmentCard: React.FC<EntertainmentCardProps> = ({
  image,
  title,
  price,
  rating,
  location,
  languages,
  openingTime,
  availability,
  seller,
  onClick,
}) => {

  const basePrice = getPriceValue(price);
  const { currency } = useCurrencyStore(); 
  const convertedPrice = currencyExchange("EGP", basePrice);
  const displayPrice = convertedPrice ? convertedPrice.toFixed(0): "N/A";

  return (
    <>
      <div className={CardStyles["entertainment-card-container"]} onClick={onClick}>
        <div className={CardStyles["entertainment-card-container__image"]}>
          {/* image and bookmark goes here */}
          <img src={image} alt="entertainment" />
        </div>

        <div className={CardStyles["entertainment-card-container__details"]}>
          <div className={CardStyles["entertainment-card-container__title-location"]}>
            {/* title and location goes here */}
            <h3>{title}</h3>
            {location !== undefined && (
              <p>
                {" "}
                <FaLocationDot style={{ fontSize: "0.8rem" }} /> {location}
              </p>
            )}
          </div>
          <div className={CardStyles["entertainment-card-container__rating"]}>
            {/* rating goes here */}
            <IoMdStar style={{ fontSize: "0.8rem" }} />

            <p>{rating?.toPrecision(2)}</p>
          </div>
          <div className={CardStyles["entertainment-card-container__language-time"]}>
            {/* language and opening time and availability goes here */}

            {languages !== undefined && (
              <p>
                <br />
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <GrLanguage style={{ marginRight: "0.4rem" }} /> {languages?.join("/")}
                </div>
              </p>
            )}

            {openingTime !== undefined && (
              <p>
                Opening Hours: <br /> {openingTime.open}-{openingTime.close}
              </p>
            )}

            {availability !== undefined &&
              (availability ? (
                <p>
                  <br />
                  Available Book NOW!
                </p>
              ) : (
                <p>
                  <br />
                  Booking Closed!
                </p>
              ))}

            {seller !== undefined && (
              <p>
                <strong>Seller:</strong>
                {seller}
              </p>
            )}
          </div>

          <div className={CardStyles["entertainment-card-container__price"]}>
            {seller === undefined && <p>From {displayPrice} {currency}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default EntertainmentCard;
