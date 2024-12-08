import React from "react";
import Header from "./OverViewHeader"; // Adjust import path as needed
import { OverViewContent } from "./OverViewContent"; // Adjust import path as needed
import styles from "../../styles/Overview-card-styles/OverViewCard.module.css";

interface OverviewCardProps {
  currency: string;
  originalPrice?: number;
  discount?: number; // Optional for cases without a discount
  tickets?: string[];
  date?: string;
  time?: string;
  dateOptions?: boolean; // For the dropdown in Content
  onDateChange?: (selectedDate: string) => void;
  buttonText: string;
  onButtonClick?: () => void;
  buttonColor: "gold" | "red" | "blue"; // Color options for the button
  button2Text?: string; // Optional for cases with two buttons
  onButton2Click?: () => void; // Optional for cases with two buttons
  button2Color?: "gold" | "red"; // Optional for cases with two buttons
  disabled?: boolean;
  disabled2?: boolean; // Optional for cases with two buttons
  dropdownOptions?: { value: string; label: string }[]; // Options for the dropdown
  onTicketSelect?: (index: number) => void; // Handler for ticket selection
  selectedTicketIndex?: number; // Index of the selected ticket
  notify?: boolean; // Optional for the notification bell
  footerText?: string; // Optional for any extra text to be displayed
  isNotifyAnimating?: boolean;
  promocodeDiscount?: number; // Optional for cases with a promo code discount
}

export const OverviewCard: React.FC<OverviewCardProps> = ({
  currency,
  originalPrice,
  discount,
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
  disabled2,
  onTicketSelect,
  notify,
  footerText,
  isNotifyAnimating,
  promocodeDiscount,
}) => {
  return (
    <div className={styles.card}>
      {/* Header Section */}
      <Header
        originalPrice={originalPrice}
        discount={discount}
        currency={currency}
        promocodeDiscount={promocodeDiscount}
      />

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
        disabled2={disabled2}
        onTicketSelect={onTicketSelect}
        notify={notify}
        footerText={footerText}
        isNotifyAnimating={isNotifyAnimating}
      />
    </div>
  );
};
