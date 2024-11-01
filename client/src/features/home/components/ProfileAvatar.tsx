import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/api-calls/users-api-calls";
import AvatarStyles from "../styles/ProfileAvatar.module.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TUser } from "@/features/admin/utils/user-columns";

export const ProfileAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const { id } = useParams<{ id: string }>();
  console.log(id);

  const { data: user, isLoading, isError } = useQuery<TUser>({
    queryKey: ["user", id],
    queryFn: () => getUserById(id as string),
    enabled: !!id, 
  });

  // Access firstName directly from the user object
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const avatarLetters = firstName && lastName ? `${firstName[0]}${lastName[0]}` : "US";
  console.log(firstName); // This will log the firstName once the data is fetched


  return (
    <div className={AvatarStyles["dropdown"]}>
      <button
        className={`${AvatarStyles.iconButton} ${isOpen ? AvatarStyles.active : ""}`}
        onClick={toggleDropdown}
      >
        <RxHamburgerMenu style={{ fontSize: "0.9rem" }} />

        <Avatar className="w-8 h-8">
          <AvatarFallback>{avatarLetters}</AvatarFallback>
        </Avatar>
      </button>
      {isOpen && (
        <div className={AvatarStyles["menu"]}>
         <Link to={`/user-settings/${id}`}> <div className={AvatarStyles["menuItem"]}>Account</div></Link> 
          <div className={AvatarStyles["menuItem"]}>Trips</div>
          <div className={AvatarStyles["menuItem"]}>Wallet</div>
          <div className={AvatarStyles["menuItem"]}>Loyalty</div>
          <div className={AvatarStyles["menuItem"]}>Help Center</div>
          <Link to="/entertainment" ><div className={AvatarStyles["logout"]}>Log Out</div></Link>
        </div>
      )}
    </div>
  );
};
