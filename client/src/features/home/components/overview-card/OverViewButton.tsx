import { useState } from "react";
import ButtonStyles from "../../styles/Overview-card-styles/OverViewButton.module.css";
import AnimatedNotificationBell from "../NotificationBell";
import { toast } from "@/hooks/use-toast";
interface ButtonProps {
  label: string;
  onClick?: () => void;
  color: "gold" | "red" | "blue";
  disabled?: boolean;
}

export const OverViewButton: React.FC<ButtonProps> = ({ label, onClick, color, disabled }) => {

  const [isAnimating, setIsAnimating] = useState(false);
  const handleButtonClick = () => {
    setIsAnimating(true);
    //Todo add notify me logic here
    setTimeout(() => setIsAnimating(false), 1000);

    toast({
      title: `You will be notified when activity is available`,
      duration: 3500,
    });
  }
  return (
    <button
      className={`${ButtonStyles.button} ${ButtonStyles[color]} ${disabled ? ButtonStyles.disabled : ""}`}
      onClick={color==="blue"?handleButtonClick: onClick}
      disabled={disabled}
    >
      {color === "blue" && <AnimatedNotificationBell color={"white"} animate={isAnimating} />}
      {label}
    </button>
  );
};
