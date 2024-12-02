import TouristHomePageNavigation from "./TouristHomePageNavigation";
import { Outlet } from "react-router-dom";

interface TouristHomePageProps {
  loggedIn: boolean;
}

export default function TouristHomePage(TouristHomePageProps: TouristHomePageProps) {
  return (
    <>
      <TouristHomePageNavigation />
      <Outlet />
    </>
  );
}
