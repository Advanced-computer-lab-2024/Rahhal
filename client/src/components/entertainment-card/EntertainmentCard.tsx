import CardStyles from "./EntertainmentCard.module.css";
import { IoMdStar } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { GrLanguage } from "react-icons/gr";
import { IRating  } from "../home-page/main-content-div/GeneralGridView";
import { getPriceValue } from "../home-page/main-content-div/GeneralGridView";
interface EntertainmentCardProps {
  image: string;
  title: string;
  price: number | { min: number; max: number } | { foreigner: number, native: number, student: number} | { type: string; price: number }[];
  rating: number;
  location?: string;
  languages?: string[];
  openingTime?: string;
  availability?: boolean;
  seller?: string;
  onClick?: () => void;
}
const isPriceRange = (price: number | { min: number; max: number }): price is { min: number; max: number } => {
  return typeof price === 'object' && price !== null && 'min' in price && 'max' in price;
};
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
            <h3 style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{title}</h3>
            {location !== undefined && (
              <p
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FaLocationDot style={{ fontSize: "0.8rem", marginRight: "5px" }} /> {location.latitude + " " + location.longitude}
              </p>
            )}
          </div>

          <div className={CardStyles["entertainment-card-container__rating"]}>
            {/* rating goes here */}
            <IoMdStar style={{ fontSize: "0.8rem" }} />

            <p>{rating?.toPrecision(2)}</p>
            {/*fix this*/}
          </div>

          <div className={CardStyles["entertainment-card-container__language-time"]}>
            {/* language and opening time and availability goes here */}

            {languages !== undefined && (
              <p>
                <br />
                <GrLanguage /> {languages?.join("/")}
              </p>
            )}

            {openingTime !== undefined && (
              <p>
                Opening Hours: <br /> {openingTime}
              </p>
            )}

            {availability !== undefined &&
              (availability ? <p>Available Book NOW!</p> : <p>Booking Closed!</p>)}

            {seller !== undefined && (
              <p>
                <strong>Seller:</strong>
                {seller}
              </p>
            )}
          </div>

          <div className={CardStyles["entertainment-card-container__price"]}>
            {seller === undefined && <h5>From {getPriceValue(price)} EGP</h5>}
          </div>
        </div>
      </div>
    </>
  );
};

export default EntertainmentCard;
