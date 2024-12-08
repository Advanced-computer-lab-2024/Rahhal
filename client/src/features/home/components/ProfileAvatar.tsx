import { useQuery } from "@tanstack/react-query";
import { getUserById, logoutUser } from "@/api-calls/users-api-calls";
import AvatarStyles from "../styles/ProfileAvatar.module.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTour } from '@/components/AppTour';
import useUserStore,{ UserState } from "@/stores/user-state-store";

export const ProfileAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { startTour } = useTour();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleLogoutUser = async () => {
    await logoutUser();
    UserState();
  };

  const { id } = useUserStore();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id as string),
    enabled: !!id,
  });

  // Access firstName directly from the user object
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const avatarLetters = firstName && lastName ? `${firstName[0]}${lastName[0]}` : "US";

  return (
    <div className={AvatarStyles["dropdown"]}>
      <button
        className={`${AvatarStyles.iconButton} ${isOpen ? AvatarStyles.active : ""}`}
        onClick={toggleDropdown}
      >
        <RxHamburgerMenu style={{ fontSize: "0.9rem" }} />

        <Avatar className="w-8 h-8">
          <AvatarImage src={user?.profilePicture}></AvatarImage>
          <AvatarFallback>{avatarLetters}</AvatarFallback>
        </Avatar>
      </button>
      {isOpen && (
        <div className={AvatarStyles["menu"]}>
          <Link to={`/user-settings`} onClick={toggleDropdown}>
            {" "}
            <div className={AvatarStyles["menuItem"]}>Account</div>
          </Link>
          <Link to={`/my-trips`} onClick={toggleDropdown}>
            {" "}
            <div className={AvatarStyles["menuItem"]}>Trips</div>
          </Link>

          <Link to={`/my-wishlist`} onClick={toggleDropdown}>
            <div className={AvatarStyles["menuItem"]}>Wishlist</div>
          </Link>

          <Link to={`/my-orders`}>
            {" "}
            <div className={AvatarStyles["menuItem"]} onClick={toggleDropdown}>
              My Orders
            </div>
          </Link>
          <Link to={`/my-bookmarks`}>
            {" "}
            <div className={AvatarStyles["menuItem"]} onClick={toggleDropdown}>
              Bookmarks
            </div>
          </Link>
          <Link to={`/user-settings/wallet`}>
            <div className={AvatarStyles["menuItem"]}>Wallet</div>
          </Link>
          <Link to={`/entertainment`} onClick={() => {
            toggleDropdown();
            setTimeout(startTour, 50);
          }}>
            <div className={AvatarStyles["menuItem"]}>Restart Tour</div>
          </Link>
          <Link to={`/help-center`} onClick={toggleDropdown}>
            <div className={AvatarStyles["menuItem"]}>Help Center</div>
          </Link>
          <Link
            to="/"
            onClick={() => {
              toggleDropdown();
              handleLogoutUser();
            }}
          >
            <div className={AvatarStyles["logout"]}>Log Out</div>
          </Link>
        </div>
      )}
    </div>
  );
};
