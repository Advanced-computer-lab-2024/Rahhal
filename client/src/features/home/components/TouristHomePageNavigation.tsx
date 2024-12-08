import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ProfileAvatar } from "./ProfileAvatar";
import CurrencyDropdown from "./CurrencyDropdown";
import SecondaryLogo from "../../logos/SecondaryLogo";
import { CartIcon } from "@/features/checkout/components/CartIcon";
import BookmarkNavIcon from "./bookmarks/BookmarkNavIcon";
import WishlistIcon from "./wishlist/WishListIcon";
import NotificaionPopover from "../../../components/NotificationPopover";

interface ButtonProps {
  navigation: number;
  setNavigation: (index: number) => void;
  setActiveIndex: (index: number) => void;
  index: number;
  buttonName: string;
  path: string;
}

interface NavigationProps {
  loggedIn: boolean;
}

export default function TouristHomePageNavigation(NavigationProps: NavigationProps) {
  const { id: paramId } = useParams<{ id?: string }>();
  const location = useLocation();
  const [navigation, setNavigation] = useState(1);
  const buttonNames = ["Experiences", "Stays", "Travel", "Shop"];
  const paths = ["/entertainment", "/stays", "/travel", "/shop"];
  const [activeIndex, setActiveIndex] = useState(0);

  function useIdFromParamsOrQuery() {
    const queryParams = new URLSearchParams(location.search);
    const queryId = queryParams.get("userId");

    return paramId || queryId;
  }

  const [id, setId] = useState(useIdFromParamsOrQuery);

  const icons = [
    { component: <WishlistIcon />, route: `/my-wishlist/${id}` },
    { component: <CartIcon />, route: null },
    { component: <BookmarkNavIcon />, route: null },
    { component: <CurrencyDropdown />, route: null },
    { component: <ProfileAvatar />, route: null },
  ];

  return (
    <div className="w-full h-16 flex items-center justify-between z-10 relative px-[16px]">
      {/* Left placeholder to balance layout */}
      <div className="flex-1">
        <SecondaryLogo />
      </div>

      {/* Centered Navigation Buttons */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-12 items-center">
        {buttonNames.map((buttonName, index) => (
          <NavigationButton
            key={index}
            index={index + 1}
            navigation={navigation}
            setNavigation={setNavigation}
            setActiveIndex={setActiveIndex}
            path={paths[index] + (!NavigationProps.loggedIn ? "" : `/${id}`)}
            buttonName={buttonName}
          />
        ))}
      </div>

      {/* Right-Side Authentication Buttons or Avatar */}
      <div className="flex items-center">
        {!NavigationProps.loggedIn ? (
          <div className="flex space-x-4 items-center">
            <Link to="/signin">
              <Button className="text-[var(--primary-color)] border border-[var(--primary-color)] bg-white rounded-xl hover:bg-[var(--secondary-color-hover)]  transition-all px-3 py-0">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="text-white bg-[var(--primary-color)] rounded-xl hover:bg-[var(--primary-color-hover)] transition-all px-3 py-0 ">
                Register
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex space-x-4 items-center">
              <NotificaionPopover userId={id} />
              {activeIndex === 1 ? (
                <BookmarkNavIcon />
              ) : activeIndex === 4 ? (
                <>
                  <div className="flex items-center space-x-4">
                    <CartIcon />
                    <Link to={`/my-wishlist/${id}`} className="flex items-center">
                      <WishlistIcon />
                    </Link>
                  </div>
                </>
              ) : null}
              <CurrencyDropdown />
              <ProfileAvatar />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function NavigationButton(ButtonProps: ButtonProps) {
  return (
    <Link to={ButtonProps.path}>
      <div
        className={cn(
          "rounded-full flex justify-center transition-all duration-300",
          ButtonProps.navigation === ButtonProps.index ? "bg-gray-300" : "hover:bg-gray-300/60",
        )}
        style={{
          padding: ButtonProps.navigation === ButtonProps.index ? "0.5rem" : "0.25rem",
        }}
      >
        <Button
          className={cn(
            "rounded-none rounded-t-md relative w-20 h-6 text-foreground bg-transparent hover:bg-transparent",
            ButtonProps.navigation === ButtonProps.index
              ? "font-semibold"
              : "text-muted-foreground",
          )}
          onClick={() => {
            ButtonProps.setNavigation(ButtonProps.index);
            ButtonProps.setActiveIndex(ButtonProps.index); // Ensure activeIndex is updated
          }}
        >
          {ButtonProps.buttonName}
        </Button>
      </div>
    </Link>
  );
}
