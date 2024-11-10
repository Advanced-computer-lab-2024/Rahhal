import React from "react";
import Header from "./OverViewHeader"; // Adjust import path as needed
import { OverViewContent } from "./OverViewContent"; // Adjust import path as needed
import { OverViewButton } from "./OverViewButton"; // Adjust import path as needed
import styles from "../../styles/Overview-card-styles/OverViewCard.module.css";

interface Ticket {
  category: string;
  price: number;
  quantity: number;
}

interface OverviewCardProps {
  currency: string;
  originalPrice: number | string;
  discountedPrice?: number | string; // Optional for cases without a discount
  tickets?: string[];
  date?: string;
  time?: string;
  dateOptions?: boolean; // For the dropdown in Content
  onDateChange?: (selectedDate: string) => void;
  buttonText: string;
  onButtonClick?: () => void;
  buttonColor: "gold" | "red"; // Color options for the button
  button2Text?: string; // Optional for cases with two buttons
  onButton2Click?: () => void; // Optional for cases with two buttons
  button2Color?: "gold" | "red"; // Optional for cases with two buttons
  disabled?: boolean;
  dropdownOptions?: { value: string; label: string }[]; // Options for the dropdown
  onTicketSelect?: (index: number) => void; // Handler for ticket selection
  selectedTicketIndex?: number; // Index of the selected ticket
}

export const OverviewCard: React.FC<OverviewCardProps> = ({
  currency,
  originalPrice,
  discountedPrice,
  tickets,
  date,
  time,
  dateOptions,
  onDateChange,
  dropdownOptions,
  buttonText,
  buttonColor,
  onButtonClick,
  button2Text,
  onButton2Click,
  button2Color,
  disabled,
  onTicketSelect,
}) => {
  
  return (
    <div className={styles.card}>
      {/* Header Section */}
      <Header originalPrice={originalPrice} discountedPrice={discountedPrice} currency={currency} />

      {/* Content Section */}
      <OverViewContent
        tickets={tickets}
        date={date}
        time={time}
        dateOptions={dateOptions}
        onDateChange={onDateChange}
        dropdownOptions={dropdownOptions}
        buttonText={buttonText}
        buttonColor={buttonColor}
        onButtonClick={onButtonClick}
        button2Text={button2Text}
        onButton2Click={onButton2Click}
        button2Color={button2Color}
        disabled={disabled}
        onTicketSelect={onTicketSelect}
      />
    </div>
  );
};
