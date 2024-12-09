import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState,useEffect } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { ProfileAvatar } from "./ProfileAvatar";
import CurrencyDropdown from "./CurrencyDropdown";
import SecondaryLogo from "../../logos/SecondaryLogo";
import { CartIcon } from "@/features/checkout/components/CartIcon";
import BookmarkNavIcon from "./bookmarks/BookmarkNavIcon";
import WishlistIcon from "./wishlist/WishListIcon";
import NotificaionPopover from "../../../components/NotificationPopover";
import useUserStore from "@/stores/user-state-store.ts";

interface ButtonProps {
    navigation: number;
    setNavigation: (index: number) => void;
    index: number;
    buttonName: string;
    path: string;
}


export default function TouristHomePageNavigation() {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (location.pathname === "/entertainment") {
            setActiveIndex(0);
            setNavigation(1);
        } else if (location.pathname === "/stays") {
            setActiveIndex(1);
            setNavigation(2);
        } else if (location.pathname === "/travel") {
            setActiveIndex(2);
            setNavigation(3);
        } else if (location.pathname === "/shop") {
            setActiveIndex(3);
            setNavigation(4);
        }
    }, []);

   
    const [navigation, setNavigation] = useState(location.pathname === "/entertainment" ? 1 : location.pathname === "/stays" ? 2 : location.pathname === "/travel" ? 3 : location.pathname === "/shop" ? 4 : -1);
    const buttonNames = ["Experiences", "Stays", "Travel", "Shop"];
    const paths = ["/entertainment", "/stays", "/travel", "/shop"];
    const [activeIndex, setActiveIndex] = useState(location.pathname === "/entertainment" ? 0 : location.pathname === "/stays" ? 1 : location.pathname === "/travel" ? 2 : location.pathname === "/shop" ? 3 : -1);


    const { id  } = useUserStore();

    const icons = [
        { component: <WishlistIcon />, route: `/my-wishlist` },
        { component: <CartIcon />, route: null },
        { component: <BookmarkNavIcon />, route: null },
        { component: <CurrencyDropdown />, route: null },
        { component: <ProfileAvatar />, route: null },
    ];
    console.log("nav", navigation);
    console.log("active", activeIndex);
    return (
        <div className="w-full h-16 flex items-center justify-between z-10 relative px-[16px]">
            {/* Left placeholder to balance layout */}
            <div className="flex-1">
                <SecondaryLogo onClick={() => {navigate("/")}} className={"cursor-pointer"}/>
            </div>

            {/* Centered Navigation Buttons */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-12 items-center">
                {buttonNames.map((buttonName, index) => (
                    <NavigationButton
                        key={index}
                        index={index + 1}
                        navigation={navigation}
                        setNavigation={setNavigation}
                        path={paths[index]}
                        buttonName={buttonName}
                    />
                ))}
            </div>

            {/* Right-Side Authentication Buttons or Avatar */}
            <div className="flex items-center">
                {!id ? (
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
                            {navigation === 1 ? (
                                <BookmarkNavIcon />
                            ) : navigation === 4 ? (
                                <>
                                    <div className="flex items-center space-x-4">
                                        <CartIcon />
                                        <Link to={`/my-wishlist`} className="flex items-center">
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
          }}
        >
          {ButtonProps.buttonName}
        </Button>
      </div>
    </Link>
  );
}
