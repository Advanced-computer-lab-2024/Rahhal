import React, { useState } from "react";
import { ComboboxDemo } from "@/components/shadcn/ComboboxDemo";
import styles from "../../styles/Overview-card-styles/OverViewContent.module.css";
import { OverViewButton } from "./OverViewButton";

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];
interface ContentProps {
  tickets?: string[];
  date?: string;
  time?: string;
  dateOptions?: boolean; 
  buttonText: string;
  onButtonClick?: () => void;
  buttonColor: "gold" | "red";
  button2Text?: string;
  onButton2Click?: () => void;
  button2Color?: "gold" | "red";
  disabled?: boolean;
  disabled2?: boolean;
  dropdownOptions?: { value: string; label: string }[]
  onDateChange?: (selectedDate: string) => void; // Handler for dropdown selection
  onTicketSelect?: (index: number) => void; // Handler for ticket selection
}

export const OverViewContent: React.FC<ContentProps> = ({
  tickets = [],
  date,
  time,
  dateOptions,
  buttonText,
  onButtonClick,
  buttonColor,
  button2Text,
  onButton2Click,
  button2Color,
  disabled,
  disabled2,
  dropdownOptions,
  onDateChange,
  onTicketSelect,
}) => {
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleTicketClick = (index: number) => {
    onTicketSelect && onTicketSelect(index);
    setSelectedTicket(index);
  };

  const handleDateSelect = (DateChosen: string) => {
    setSelectedDate(DateChosen);
    onDateChange && onDateChange(DateChosen); 
  };

  const isButtonDisabled = 
  !(dateOptions || tickets.length > 0) 
  ? false 
  : (selectedTicket === null && !selectedDate);
  console.log(button2Text , onButton2Click , button2Color , disabled2);
  return (
    <div className={styles["content"]}>
    {tickets.length > 0 || dropdownOptions && <h3>Ticket Selection</h3>}
      {/* Date Selector using Dropdown Component */}
      {dateOptions && (
        <div className={styles.dateSelector}>
          <ComboboxDemo
            data={dropdownOptions}
            onSelect={handleDateSelect} 
          />
        </div>
      )}

      {/* Ticket Selection */}

      {tickets && tickets.length > 0 && (
        <>
          {tickets.map((ticket, index) => (
            <p
              key={index}
              className={`${styles.ticketText} ${selectedTicket === index ? styles.selected : ""}`}
              onClick={() => handleTicketClick(index)}
            >
              {ticket}
            </p>
          ))}
        </>
      )}

      {/* Date & Time Display */}
      {date && time && (
        <div className={styles["dateTime"]}>
          <p>Date & Time:</p>
          <p>
            {date} {time}
          </p>
        </div>
      )}

      <OverViewButton
        label={buttonText}
        onClick={onButtonClick}
        color={buttonColor}
        disabled={isButtonDisabled || disabled}
      />

      {button2Text && onButton2Click && button2Color && (
        <OverViewButton
          label={button2Text}
          onClick={onButton2Click}
          color={button2Color}
          disabled={isButtonDisabled || disabled2}
        />
      )}
    </div>
  );
};
