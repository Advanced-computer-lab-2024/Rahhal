import React, { useState } from "react";
import { OverviewCard } from "../overview-card/OverViewCard";
import { TPopulatedBooking } from "../../types/home-page-types";
import { addLoyalityPoints, getUserById } from "@/api-calls/users-api-calls";
import { fetchPreferenceTagById } from "@/api-calls/preference-tags-api-calls";
import { createBooking } from "@/api-calls/booking-api-calls";
import { useLocation, useParams } from "react-router-dom";
import TouristHomePageNavigation from "../TouristHomePageNavigation";
import ItinerariesPageTemplate from "../ItinerariesPageTemplate";
import { useCurrencyStore } from "@/stores/currency-exchange-store";
import { bookingType } from "@/utils/enums";
import { format } from "date-fns";

const ItineraryDetailsPage: React.FC = () => {
  const loc = useLocation();
  const itinerary = loc.state?.item;
  const {
    name,
    images,
    description,
    activities,
    durationOfActivities,
    price,
    pickUpLocation,
    dropOffLocation,
    availableDatesTime,
    ratings,
    accessibility,
    languages,
    preferenceTags,
    ownerName,
  } = itinerary;

  const [preferenceTagNames, setPreferenceTagNames] = useState<string[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const { id } = useParams();
  const { currency } = useCurrencyStore();

  React.useEffect(() => {
    if (id) {
      if (id !== "undefined")
        getUserById(id).then((user) => {
          // check if user is not approved or is under 18 years old
          if (
            !user.approved ||
            (user.dob && user.dob > new Date(new Date().setFullYear(new Date().getFullYear() - 18)))
          )
            setIsButtonDisabled(true);
        });
      setIsButtonDisabled(false);
    }
  }, []);

  React.useEffect(() => {
    for (let i = 0; i < itinerary.preferenceTags.length; i++) {
      fetchPreferenceTagById(itinerary.preferenceTags[i]._id).then((tag) => {
        setPreferenceTagNames((prev) => [(tag as { _id: string; name: string }).name]);
      });
    }
  }, [preferenceTags]);

  const handleButtonClick = () => {
    if (id && id !== "undefined") {
      createBooking({
        user: id,
        entity: itinerary._id ?? "",
        type: bookingType.Itinerary,
        selectedPrice: price,
        selectedDate: selectedDate ? new Date(selectedDate) : new Date(),
      }).then((response) => {
        const booking = response as TPopulatedBooking;
        addLoyalityPoints(id, booking.selectedPrice);
      });
    } else {
      alert("You must login");
    }
  };

  const cardButtonText = "Book Itinerary";

  const cardDropdownOptions = availableDatesTime
    .filter((date: { Date: string | Date }) => new Date(date.Date) > new Date())
    .map((date: { Date: string | Date }) => ({
      value: date.Date.toString(),
      label: format(new Date(date.Date), "dd/MM/yyyy hh:mm a"),
    }));
  return (
    <div>
      <TouristHomePageNavigation loggedIn={id ? id !== "undefined" : false} />
      <ItinerariesPageTemplate
        name={name}
        ownerName={ownerName}
        images={images}
        dropOffLocation={dropOffLocation}
        pickUpLocation={pickUpLocation}
        preferenceTagNames={preferenceTagNames}
        description={description}
        ratings={ratings}
        activities={activities}
        durationOfActivities={durationOfActivities}
        languages={languages}
        accessibility={accessibility}
      >
        <OverviewCard
          currency={currency}
          originalPrice={price}
          buttonText={cardButtonText}
          buttonColor={"gold"}
          dropdownOptions={cardDropdownOptions}
          dateOptions={true}
          disabled={isButtonDisabled && !selectedDate}
          onButtonClick={handleButtonClick}
          onDateChange={(selectedDate) => setSelectedDate(selectedDate)}
        />
      </ItinerariesPageTemplate>
    </div>
  );
};

export default ItineraryDetailsPage;
