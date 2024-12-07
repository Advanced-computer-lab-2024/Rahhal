import { useState } from "react";
import ButtonStyles from "../../styles/Overview-card-styles/OverViewButton.module.css";
import AnimatedNotificationBell from "../NotificationBell";
interface ButtonProps {
  label: string;
  onClick?: () => void;
  color: "gold" | "red" | "blue";
  disabled?: boolean;
  notify?: boolean;
}

export const OverViewButton: React.FC<ButtonProps> = ({
  label,
  onClick,
  color,
  disabled,
  notify,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const handleButtonClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
    onClick && onClick();
  };
  return (
    <button
      className={`${ButtonStyles.button} ${ButtonStyles[color]} ${disabled ? ButtonStyles.disabled : ""}`}
      onClick={notify ? handleButtonClick : onClick}
      disabled={disabled}
    >
      {color === "blue" && <AnimatedNotificationBell color={"white"} animate={isAnimating} />}
      {label}
    </button>
  );
};
