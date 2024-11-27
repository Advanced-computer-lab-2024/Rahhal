import CheckoutNavigation from "./CheckoutNavigation";
import { Outlet } from "react-router-dom";


export default function CheckoutPage() {
  return (
    <>
      <CheckoutNavigation/>
      <Outlet />
    </>
  );
}
