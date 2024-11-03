import PageStyles from "../styles/MyTripsPage.module.css";
import { MyTripsCard } from "./MyTripsCard";
import TouristHomePageNavigation from "./TouristHomePageNavigation";

export const MyTripsPage = () => {
  return (
    <>
      <div className={PageStyles['trip-page-header']}> 
        <p>Trips & Booking</p>
      </div>

      <div className={PageStyles["trip-list"]}>
        <MyTripsCard />
        <MyTripsCard />
        <MyTripsCard />
        <MyTripsCard />
      </div>
    </>
  );
};
