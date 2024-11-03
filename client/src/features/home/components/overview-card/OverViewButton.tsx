import ButtonStyles from "../../styles/Overview-card-styles/OverViewButton.module.css";
interface ButtonProps {
    label: string;
    onClick?: () => void;
    color: "gold" | "red";
    disabled?: boolean;
  }

export const OverViewButton: React.FC<ButtonProps>  = ({ label, onClick, color, disabled })=>{
    return (
        <button
          className={`${ButtonStyles.button} ${ButtonStyles[color]} ${disabled ? ButtonStyles.disabled : ""}`}
          onClick={onClick}
          disabled={disabled}
        >
          {label}
        </button>
      );


}