import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProfileAvatar } from "./ProfileAvatar";
import CurrencyDropdown from "./CurrencyDropdown";
import SecondaryLogo from "../../logos/SecondaryLogo";
import { CartIcon } from "@/features/checkout/components/CartIcon";
import BookmarkNavIcon from "./bookmarks/BookmarkNavIcon";
import WishlistIcon from "./wishlist/WishListIcon";
import NotificaionPopover from "../../../components/NotificationPopover";
import useUserStore from "@/stores/user-state-store";
import { Menu, X } from "lucide-react";
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
  const [navigation, setNavigation] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const buttonNames = ["Experiences", "Stays", "Travel", "Shop"];
  const paths = ["/entertainment", "/stays", "/travel", "/shop"];
  const { id } = useUserStore();

  useEffect(() => {
    if (location.pathname === "/entertainment") {
      setNavigation(1);
    } else if (location.pathname === "/stays") {
      setNavigation(2);
    } else if (location.pathname === "/travel") {
      setNavigation(3);
    } else if (location.pathname === "/shop") {
      setNavigation(4);
    }
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Main Navigation Bar */}
      <div
        className="w-full h-16 flex items-center justify-between  relative px-4 lg:px-6"
        id="main-nav-bar-tour"
      >
        {/* Logo */}
        <div className="flex-shrink-0">
          <SecondaryLogo
            onClick={() => {
              navigate("/");
            }}
            className="cursor-pointer"
          />
        </div>

        {/* Desktop Navigation - Hidden on mobile/tablet */}
        <div
          className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 space-x-8 items-center"
          id="nav-bar-tour"
        >
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

        {/* Right Side - Desktop Only */}
        <div className="hidden lg:flex items-center space-x-3">
          {!id ? (
            <div className="flex space-x-3 items-center">
              <Link to="/signin">
                <Button className="text-[var(--primary-color)] border border-[var(--primary-color)] bg-white rounded-xl hover:bg-[var(--secondary-color-hover)] transition-all px-3 py-1 text-sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="text-white bg-[var(--primary-color)] rounded-xl hover:bg-[var(--primary-color-hover)] transition-all px-3 py-1 text-sm">
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex space-x-3 items-center">
              <NotificaionPopover userId={id} />
              {navigation === 1 ? (
                <BookmarkNavIcon />
              ) : navigation === 4 ? (
                <div className="flex items-center space-x-3">
                  <CartIcon />
                  <Link to={`/my-wishlist`} className="flex items-center">
                    <WishlistIcon />
                  </Link>
                </div>
              ) : null}
              <CurrencyDropdown />
              <ProfileAvatar />
            </div>
          )}
        </div>

        {/* Mobile/Tablet Menu Button */}
        <div
          className="lg:hidden flex items-center space-x-2"
          id="nav-bar-tour-mobile"
        >
          {id && <NotificaionPopover userId={id} />}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Sidebar Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 transition-all duration-300 ease-in-out lg:hidden",
          isMobileMenuOpen ? "visible" : "invisible"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-black transition-opacity duration-300",
            isMobileMenuOpen ? "opacity-50" : "opacity-0"
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto z-50",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <SecondaryLogo
                onClick={() => {
                  navigate("/");
                  setIsMobileMenuOpen(false);
                }}
                className="cursor-pointer"
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 p-4">
              <div className="space-y-3 mb-6" id="nav-bar-tour-mobile-menu">
                {buttonNames.map((buttonName, index) => (
                  <Link
                    key={index}
                    to={paths[index]}
                    onClick={() => {
                      setNavigation(index + 1);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "block w-full text-left px-4 py-3 rounded-lg transition-colors text-lg font-medium",
                      location.pathname.includes(paths[index]) ||
                        (paths[index] === "/entertainment" &&
                          !["/stays", "/travel", "/shop", "/home"].some(
                            (subPath) => location.pathname.includes(subPath)
                          ))
                        ? "bg-[var(--primary-color)] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {buttonName}
                  </Link>
                ))}
              </div>

              {/* User Actions */}
              {id && (
                <div className="space-y-3 border-t pt-4">
                  {navigation === 1 && (
                    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Bookmarks</span>
                      <BookmarkNavIcon />
                    </div>
                  )}
                  {navigation === 4 && (
                    <>
                      <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Cart</span>
                        <CartIcon />
                      </div>
                      <Link
                        to="/my-wishlist"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                      >
                        <span className="text-gray-700">Wishlist</span>
                        <WishlistIcon />
                      </Link>
                    </>
                  )}
                  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Currency</span>
                    <CurrencyDropdown />
                  </div>
                  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Profile</span>
                    <ProfileAvatar />
                  </div>
                </div>
              )}
            </div>

            {/* Auth Buttons for Mobile */}
            {!id && (
              <div className="p-4 border-t space-y-3">
                <Link
                  to="/signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full"
                >
                  <Button className="w-full text-[var(--primary-color)] border border-[var(--primary-color)] bg-white rounded-xl hover:bg-[var(--secondary-color-hover)] transition-all py-3">
                    Login
                  </Button>
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full"
                >
                  <Button className="w-full text-white bg-[var(--primary-color)] rounded-xl hover:bg-[var(--primary-color-hover)] transition-all py-3">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function NavigationButton(ButtonProps: ButtonProps) {
  const location = useLocation();
  const subPaths = ["/stays", "/travel", "/shop", "/home"];

  const isActive =
    location.pathname.includes(ButtonProps.path) ||
    (ButtonProps.path === "/entertainment" &&
      !subPaths.some((subPath) => location.pathname.includes(subPath)));

  return (
    <Link to={ButtonProps.path}>
      <div
        className={cn(
          "rounded-full flex justify-center transition-all duration-300",
          isActive ? "bg-gray-300" : "hover:bg-gray-300/60"
        )}
        style={{
          padding: isActive ? "0.5rem" : "0.25rem",
        }}
      >
        <Button
          className={cn(
            "rounded-none rounded-t-md relative whitespace-nowrap px-3 py-2 text-foreground bg-transparent hover:bg-transparent",
            isActive ? "font-semibold" : "text-muted-foreground"
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
