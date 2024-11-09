import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/api-calls/users-api-calls";
import AvatarStyles from "../styles/ProfileAvatar.module.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function useIdFromParamsOrQuery() {
  const { id: paramId } = useParams<{ id?: string }>();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const queryId = queryParams.get("userId");

  return paramId || queryId;
}

export const ProfileAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const id = useIdFromParamsOrQuery();

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
          <Link to={`/user-settings/${id}`} onClick={toggleDropdown}>
            {" "}
            <div className={AvatarStyles["menuItem"]}>Account</div>
          </Link>
          <Link to={`/my-trips/${id}`} onClick={toggleDropdown}>
            {" "}
            <div className={AvatarStyles["menuItem"]}>Trips</div>
          </Link>
          <Link to={`/my-orders/${id}`}>
            {" "}
            <div className={AvatarStyles["menuItem"]} onClick={toggleDropdown}>
              My Orders
            </div>
          </Link>
          <Link to={`/user-settings/wallet/${id}`}>
            <div className={AvatarStyles["menuItem"]}>Wallet</div>
          </Link>
          <div className={AvatarStyles["menuItem"]} onClick={toggleDropdown}>
            Loyalty
          </div>
          <Link to={`/help-center/${id}`} onClick={toggleDropdown}>
            <div className={AvatarStyles["menuItem"]}>Help Center</div>
          </Link>
          <Link to="/entertainment" onClick={toggleDropdown}>
            <div className={AvatarStyles["logout"]}>Log Out</div>
          </Link>
        </div>
      )}
    </div>
  );
};
