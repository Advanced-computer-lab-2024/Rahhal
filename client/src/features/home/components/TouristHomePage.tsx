import TouristHomePageNavigation from "./TouristHomePageNavigation";
import { Outlet } from "react-router-dom";



export default function TouristHomePage() {
  return (
    <>
      <TouristHomePageNavigation />
      <Outlet />
    </>
  );
}
