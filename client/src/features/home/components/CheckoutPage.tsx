import CheckoutNavigation from "./CheckoutNavigation";
import { Outlet, useParams } from "react-router-dom";
import TouristHomePageNavigation from "./TouristHomePageNavigation";



export default function CheckoutPage() {
  const { id } = useParams<{ id?: string }>();
  return (
    <>
      <TouristHomePageNavigation loggedIn={id? true:false }/>
      <Outlet />
    </>
  );
}
