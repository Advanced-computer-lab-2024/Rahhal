import React from "react";
import { OverviewCard } from "../overview-card/OverViewCard";
import { TPopulatedBooking } from "../../types/home-page-types";
import { addLoyalityPoints, getUserById } from "@/api-calls/users-api-calls";
import { fetchPreferenceTagById } from "@/api-calls/preference-tags-api-calls";
import { createBooking } from "@/api-calls/booking-api-calls";
import { formatDate, formatTime } from "../../utils/filter-lists/overview-card";
import { useCurrencyStore, useRatesStore } from "@/stores/currency-exchange-store";
import DetailsPageTemplateProps from "../DetailsPageTemplate";
import { useLocation, useParams } from "react-router-dom";
import TouristHomePageNavigation from "../TouristHomePageNavigation";
import { bookingType } from "@/utils/enums";

const ActivityDetailsPage: React.FC = () => {
  const loc = useLocation();
  const activity = loc.state?.item;
  const {
    name,
    images,
    description,
    location,
    date,
    price,
    ratings,
    specialDiscount,
    ownerName,
    preferenceTags,
    isBookingOpen,
  } = activity;
  const [preferenceTagNames, setPreferenceTagNames] = React.useState<string[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const [selectedTicket, setSelectedTicket] = React.useState<boolean>(false);
  const [selectedPrice, setSelectedPrice] = React.useState<number | undefined>(undefined);
  const { currency } = useCurrencyStore();
  const { rates } = useRatesStore();

  const { id } = useParams();

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
    for (let i = 0; i < activity.preferenceTags.length; i++) {
      fetchPreferenceTagById(activity.preferenceTags[i]._id).then((tag) => {
        setPreferenceTagNames((prev) => [(tag as { _id: string; name: string }).name]);
      });
    }
  }, [preferenceTags]);

  const handleButtonClick = () => {
    if (id && id !== "undefined") {
      createBooking({
        user: id,
        entity: activity._id ?? "",
        type: bookingType.Activity,
        selectedPrice: selectedPrice!,
        selectedDate: activity.date,
      }).then((response) => {
        const booking = response as TPopulatedBooking;
        addLoyalityPoints(id, booking.selectedPrice);
        alert("You have successfully booked");
      });
    } else {
      alert("You must login");
    }
  };

  const onTicketSelect = (index: number) => {
    setSelectedTicket(true);
    setSelectedPrice(price[Object.keys(price)[index]]);
  };

  const activityDate = new Date(date);
  const formattedDate = formatDate(activityDate);
  const formattedTime = formatTime(activityDate);

  const cardButtonText = isBookingOpen ? "Book Activity" : "Notify Me";

  const tickets = Object.keys(price).map((key) => {
    let convertedTicketPrice = price[key];

    if (rates.rates) {
      const rateOfEURToOld = rates.rates["EGP"];
      const rateOfEURToNew = rates.rates[currency];
      convertedTicketPrice = (price[key] * rateOfEURToNew) / rateOfEURToOld;
    }

    const displayPrice = convertedTicketPrice.toFixed(0);

    return `${key} - ${currency} ${displayPrice}`;
  });

  return (
    <div>
      <TouristHomePageNavigation loggedIn={id ? id !== "undefined" : false} />
      <DetailsPageTemplateProps
        name={name}
        ownerName={ownerName}
        images={images}
        location={location}
        preferenceTagNames={preferenceTagNames}
        description={description}
        ratings={ratings}
      >
        <OverviewCard
          currency={currency}
          originalPrice={selectedPrice}
          buttonText={cardButtonText}
          buttonColor={isBookingOpen ? "gold" : "blue"}
          date={formattedDate}
          time={formattedTime}
          disabled={(isButtonDisabled || !selectedTicket) && isBookingOpen}
          onButtonClick={handleButtonClick}
          discount={specialDiscount}
          onTicketSelect={onTicketSelect}
          tickets={tickets}
        />
      </DetailsPageTemplateProps>
    </div>
  );
};

export default ActivityDetailsPage;
