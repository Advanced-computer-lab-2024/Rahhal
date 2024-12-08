import React, { useEffect, useState } from "react";
import { OverviewCard } from "../overview-card/OverViewCard";
import { TPopulatedBooking } from "../../types/home-page-types";
import { addLoyalityPoints, getUserById } from "@/api-calls/users-api-calls";
import { fetchPreferenceTagById } from "@/api-calls/preference-tags-api-calls";
import { createBooking } from "@/api-calls/booking-api-calls";
import { formatDate, formatTime } from "../../utils/filter-lists/overview-card";
import { useCurrencyStore, useRatesStore } from "@/stores/currency-exchange-store";
import DetailsPageTemplateProps from "../DetailsPageTemplate";
import { useLocation, useSearchParams } from "react-router-dom";
import TouristHomePageNavigation from "../TouristHomePageNavigation";
import { bookingType } from "@/utils/enums";
import SignUpModal from "../SignupModal";
import { calculateAge } from "@/utils/age-calculator";
import BookingModal from "@/features/home/components/payment-modal/PaymentModal";
import { fetchActivityById } from "@/api-calls/activities-api-calls";
import { DEFAULT_ACTIVITY } from "../../utils/constants";
import { toast } from "@/hooks/use-toast";
import { TActivity } from "@/features/advertiser/utils/advertiser-columns";
import { createNotifyRequest } from "@/api-calls/notify-requests-api-calls";
import useUserStore from "@/stores/user-state-store";

const ActivityDetailsPage: React.FC = () => {
  const loc = useLocation();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");
  const [activity, setActivity] = useState(loc.state?.item || DEFAULT_ACTIVITY);

  const empty = activity === DEFAULT_ACTIVITY;

  useEffect(() => {
    if (!loc.state?.item && eventId) {
      fetchActivityById(eventId).then((data) => {
        setActivity(data);
        const activityData = data as TActivity;
        setSelectedPrice(activityData.price[Object.keys(activityData.price)[0]]);
      });
    }
  }, [loc.state?.item, eventId]);

  const {
    _id,
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
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [selectedPrice, setSelectedPrice] = React.useState<number | undefined>(
    price[Object.keys(price)[0]],
  );

  const [isGuestAction, setIsGuestAction] = React.useState(false);
  const [text, setText] = React.useState<string>();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isNotifyAnimating, setIsNotifyAnimating] = React.useState(false);

  const { currency } = useCurrencyStore();
  const { rates } = useRatesStore();

  const { id } = useUserStore();

  const closeModal = () => setIsModalOpen(false);

  React.useEffect(() => {
    if (id) {
      getUserById(id).then((user) => {
        // check if user is under 18 years old
        if (calculateAge(new Date(user.dob!)) < 18) {
          setIsButtonDisabled(true);
          setText("You must be 18 years or older to book this activity");
        }
      });
    }
  }, []);

  React.useEffect(() => {
    for (let i = 0; i < activity.preferenceTags.length; i++) {
      fetchPreferenceTagById(activity.preferenceTags[i]._id).then((tag) => {
        setPreferenceTagNames((prev) => [(tag as { _id: string; name: string }).name]);
      });
    }
  }, [preferenceTags]);

  const handleBookButtonClick = () => {
    if (!isModalOpen && id) {
      setIsModalOpen(true);
      return;
    }

    if (id) {
      if (isBookingOpen) {
        createBooking({
          user: id,
          entity: activity._id ?? "",
          type: bookingType.Activity,
          selectedPrice: selectedPrice!,
          selectedDate: activity.date,
        }).then((response) => {
          const booking = response as TPopulatedBooking;
          addLoyalityPoints(id, booking.selectedPrice);
        });
      } else {
        // add notify logic here
        toast({
          title: `You will be notified when activity is available`,
          duration: 3500,
        });
      }
    } else {
      setIsGuestAction(true);
    }
  };

  const handleNotifyButtonClick = () => {
    setIsNotifyAnimating(true);
    setTimeout(() => setIsNotifyAnimating(false), 1000);

    if (id){
      createNotifyRequest({
        user: id,
        entity: _id,
      });

      toast({
        title: `You will be notified when activity is available`,
        duration: 3500,
      });
    } else {
      toast({
        title: `You Must be logged in`,
        duration: 3500,
      });
    } 
  };

  const onTicketSelect = (index: number) => {
    setSelectedPrice(price[Object.keys(price)[index]]);
  };

  const activityDate = new Date(date);
  const formattedDate = formatDate(activityDate);
  const formattedTime = formatTime(activityDate);

  const cardButtonText = isBookingOpen ? "Book Activity" : "Notify Me";
  let convertedSelectedPrice = 0;
  const tickets = Object.keys(price).map((key) => {
    let convertedTicketPrice = price[key];

    if (rates.rates) {
      const rateOfEURToOld = rates.rates["EGP"];
      const rateOfEURToNew = rates.rates[currency];
      convertedTicketPrice = (price[key] * rateOfEURToNew) / rateOfEURToOld;
      convertedSelectedPrice = ((selectedPrice ?? 0) * rateOfEURToNew) / rateOfEURToOld;
    }

    const displayPrice = convertedTicketPrice.toFixed(0);

    return `${key} - ${currency} ${displayPrice}`;
  });
  return (
    <div>
      {!empty && (
        <>
          {isGuestAction && (
            <SignUpModal
              onClose={() => {
                setIsGuestAction(false);
              }}
              text={"Excited to book? Sign in or create an account to secure your spot now!"}
            />
          )}

          {isModalOpen && selectedPrice && (
            <BookingModal
              parentBookingFunc={handleBookButtonClick}
              discountPerc={specialDiscount}
              currency={currency}
              isOpen={isModalOpen}
              onClose={closeModal}
              price={convertedSelectedPrice ?? 0}
              name={name}
              type={"Activity"}
              userId={id ?? ""}
              egpPrice={selectedPrice}
            />
          )}
          <DetailsPageTemplateProps
            _id={_id}
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
              disabled={isButtonDisabled && isBookingOpen}
              onButtonClick={(isBookingOpen && !isButtonDisabled && !isGuestAction) ? handleBookButtonClick : handleNotifyButtonClick}
              discount={specialDiscount}
              onTicketSelect={onTicketSelect}
              tickets={tickets}
              isNotifyAnimating={isNotifyAnimating}
              footerText={text}
            />
          </DetailsPageTemplateProps>
        </Outlet>
      )}
      <TouristHomePageNavigation /*loggedIn={id ? id !== "undefined" : false}*/ />
      <DetailsPageTemplateProps
        _id={_id}
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
          disabled={isButtonDisabled && isBookingOpen}
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
