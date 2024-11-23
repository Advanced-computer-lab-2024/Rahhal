import ButtonStyles from "../../styles/Overview-card-styles/OverViewButton.module.css";
import AnimatedNotificationBell from "../NotificationBell";
interface ButtonProps {
  label: string;
  onClick?: () => void;
  color: "gold" | "red" | "blue";
  disabled?: boolean;
}

export const OverViewButton: React.FC<ButtonProps> = ({ label, onClick, color, disabled }) => {
  return (
    <button
      className={`${ButtonStyles.button} ${ButtonStyles[color]} ${disabled ? ButtonStyles.disabled : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {color === "blue" && <AnimatedNotificationBell color={"white"} />}
      {label}
    </button>
  );
};
