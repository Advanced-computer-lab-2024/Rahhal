import TaxiCardStyle from "../styles/TaxiCard.module.css";
import Van from "@/assets/Van.png";
import TaxiProvider from "@/assets/providerLogo.png";
import Car from "@/assets/Car.png";
import { GoPerson } from "react-icons/go";
import { MdOutlineLuggage } from "react-icons/md";
import { useState } from "react";
interface TaxiCardProps {
  type?: string;
  price?: number;
  guests?: number;
  luggage?: number;
  provider?: string;
  onclick?: () => void;
}

export const TaxiCard: React.FC<TaxiCardProps> = (props) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div
      className={`${TaxiCardStyle["card"]} ${isSelected ? TaxiCardStyle["active"] : ""}`}
      onClick={handleClick}
    >
      <div className={TaxiCardStyle["card-content"]}>
        <div className={TaxiCardStyle["card-content-left"]}>
          <img src={Car} />
          <div className={TaxiCardStyle["vehicle-details"]}>
            {/* <p>{ props.type.includes("CAR")? "Standard Car":"Van"}</p> */}
            <p>Standard car</p>
            <p>EGP {props.price ? props.price : 500}</p>
            <img src={props.provider ? props.provider : TaxiProvider} />
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
            <p>{props.luggage ? props.luggage : "10 suitcases"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
