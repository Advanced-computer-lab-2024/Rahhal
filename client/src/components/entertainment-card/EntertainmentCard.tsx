import CardStyles from "./EntertainmentCard.module.css";
import { IoMdStar } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { GrLanguage } from "react-icons/gr";
interface EntertainmentCardProps {
  image: string;
  title: string;
  price?: number;
  rating: number;
  location?: string;
  language?: string[];
  openingTime?: string;
  availability?: boolean;
  seller?: string;
}

const EntertainmentCard: React.FC<EntertainmentCardProps> = ({
  image,
  title,
  price,
  rating,
  location,
  language,
  openingTime,
  availability,
  seller,
}) => {
  return (
    <>
      <div className={CardStyles["entertainment-card-container"]}>
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

            {language !== undefined && (
              <p>
                <br />
                <GrLanguage /> {language?.join("/")}
              </p>
            )}

            {openingTime !== undefined && (
              <p>
                Opening Hours: <br /> {openingTime}
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
            {/* price goes here */}
            {/* for activities waiting for model to decide whether it is a number or string */}
            {seller === undefined && <h5>From {price} EGP</h5>}
            {seller !== undefined && <h5>{price} EGP</h5>}
          </div>
        </div>
      </div>
    </>
  );
};

export default EntertainmentCard;
