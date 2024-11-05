import TaxiCardStyle from "../styles/TaxiCard.module.css";
import Van from "@/assets/Van.png";
import Car from "@/assets/Car.png";
import { GoPerson } from "react-icons/go";
import { MdOutlineLuggage } from "react-icons/md";
interface TaxiCardProps {
  type?: string;
  price?: number;
  guests?: number;
  luggage?: number;
  provider?: string;
  currency?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const TaxiCard: React.FC<TaxiCardProps> = (props) => {
  return (
    <div
      className={`${TaxiCardStyle["card"]} ${props.isSelected ? TaxiCardStyle["active"] : ""}`}
      onClick={() => props.onClick && props.onClick()}
    >
      <div className={TaxiCardStyle["card-content"]}>
        <div className={TaxiCardStyle["card-content-left"]}>
          <img src={props.type && props.type.includes("CAR") ? Car : Van} />
          <div className={TaxiCardStyle["vehicle-details"]}>
            <p>{props.type && props.type.includes("CAR") ? "Standard Car" : "Van"}</p>
            <p>
              {props.currency} {props.price}
            </p>
            <img src={props.provider} />
          </div>
        </div>

        <div className={TaxiCardStyle["card-content-right"]}>
          <div className={TaxiCardStyle["car-info"]}>
            <span>
              <GoPerson />
            </span>
            <p>Up to {props.guests ? props.guests : 10}</p>
          </div>
          <div className={TaxiCardStyle["car-info"]}>
            <span>
              <MdOutlineLuggage />
            </span>
            <p>{props.luggage ? props.luggage : ""} suitcases</p>
          </div>
        </div>
      </div>
    </div>
  );
};
