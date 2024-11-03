import MyTripStyles from "../styles/MyTripsCard.module.css";
import felluca from "@/assets/aswan2.webp";
import { IoMdMore } from "react-icons/io";

interface MyTripsCardProps {
    image?: string;
    title?: string;
    price?:number;
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
  return (
    <div className={MyTripStyles["card-container"]}>
      <div className={MyTripStyles["trip-details"]}>
        <div className={MyTripStyles["trip-details_image-container"]}>
          <img
            src={image?image : felluca}
            className={MyTripStyles["trip-details_image-container_image"]}
            alt="felluca"
          />
        </div>

        <div className={MyTripStyles["trip-details_data"]}>
          <p>{title? title: "Felluca Ride"}</p>
          <p>{date? date : "28th July 11:00AM"}</p>
          <p>{status?status:"Upcoming"}</p>
        </div>
      </div>
      <div className={MyTripStyles["trip-price-container"]}>
        <div className={MyTripStyles["trip-price-container_text-icon"]}>
          <p>{price?price:"EGP500"}</p>
          <IoMdMore />
        </div>
      </div>
    </div>
  );
};
