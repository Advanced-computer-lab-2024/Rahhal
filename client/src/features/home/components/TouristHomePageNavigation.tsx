import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ProfileAvatar } from "./ProfileAvatar";
interface ButtonProps {
  navigation: number;
  setNavigation: (index: number) => void;
  index: number;
  buttonName: string;
  path: string;
}

interface NavigationProps {
  loggedIn: boolean;
}

export default function TouristHomePageNavigation(NavigationProps: NavigationProps) {
  const [navigation, setNavigation] = useState(1);
  const buttonNames = ["Experiences", "Stays", "Travel", "Shop"];
  const paths = ["/entertainment", "/entertainment", "/travel", "/shop"];
  const { id } = useParams();
  return (
    <div className=" w-full z-10 relative flex">
      <div className=" w-full h-full"></div>
      <div className="flex justify-center relative z-10 space-x-12  h-16 pt-2 items-center">
        {buttonNames.map((buttonName, index) => (
          <NavigationButton
            index={index + 1}
            navigation={navigation}
            setNavigation={setNavigation}
            path={paths[index] + (!NavigationProps.loggedIn ? "" : `/${id}`)}
            buttonName={buttonName}
          />
        ))}
      </div>
      <div className=" w-full h-full flex justify-end">
        {!NavigationProps.loggedIn && (
          <div className="flex space-x-4 items-center pr-3">
            <Link to="/signin">
              <Button className="text-white bg-red-400 rounded-xl hover:bg-red-500">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button className="text-white bg-red-400 rounded-xl hover:bg-red-500">Sign Up</Button>
            </Link>
          </div>
        )}
        {NavigationProps.loggedIn && (
          <div className="flex items-center pr-3">
            <ProfileAvatar/>
          </div>
        )}
      </div>
    </div>
  );
}

function NavigationButton(ButtonProps: ButtonProps) {
  return (
    <Link to={ButtonProps.path}>
      <div className="rounded-full hover:bg-gray-300/60 flex justify-center">
        <Button
          className={cn(
            "rounded-none rounded-t-md relative w-[7%] text-foreground bg-transparent hover:bg-transparent",
            ButtonProps.navigation == ButtonProps.index ? "font-semibold" : "text-muted-foreground",
          )}
          onClick={() => ButtonProps.setNavigation(ButtonProps.index)}
        >
          {" "}
          {ButtonProps.buttonName}{" "}
        </Button>
      </div>
    </Link>
  );
}
