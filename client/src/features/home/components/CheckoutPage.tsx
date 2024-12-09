import { Outlet } from "react-router-dom";
import TouristHomePageNavigation from "./TouristHomePageNavigation";



export default function CheckoutPage() {
  return (
    <>
      <TouristHomePageNavigation />
      <Outlet />
    </>
  );
}
