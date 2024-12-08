import React, { useEffect, useState } from "react";
import { OverviewCard } from "../overview-card/OverViewCard";
import { TPopulatedBooking } from "../../types/home-page-types";
import { addLoyalityPoints, getUserById } from "@/api-calls/users-api-calls";
import { fetchPreferenceTagById } from "@/api-calls/preference-tags-api-calls";
import { createBooking } from "@/api-calls/booking-api-calls";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import TouristHomePageNavigation from "../TouristHomePageNavigation";
import ItinerariesPageTemplate from "../ItinerariesPageTemplate";
import { useCurrencyStore } from "@/stores/currency-exchange-store";
import { bookingType } from "@/utils/enums";
import { format } from "date-fns";
import SignUpModal from "../SignupModal";
import { calculateAge } from "@/utils/age-calculator";
import BookingModal from "@/features/home/components/payment-modal/PaymentModal";
import currencyExchange from "@/utils/currency-exchange";
import { DEFAULT_ITINERARY } from "../../utils/constants";
import { fetchItineraryById } from "@/api-calls/itineraries-api-calls";
import { toast } from "@/hooks/use-toast";
import { createNotifyRequest } from "@/api-calls/notify-requests-api-calls";
import useUserStore from "@/stores/user-state-store";


const ItineraryDetailsPage: React.FC = () => {
  const loc = useLocation();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");
  const [itinerary, setItinerary] = useState(loc.state?.item || DEFAULT_ITINERARY);

  const empty = itinerary === DEFAULT_ITINERARY;

  useEffect(() => {
    if (!loc.state?.item && eventId) {
      fetchItineraryById(eventId).then((data) => {
        setItinerary(data);
      });
    }
  }, [loc.state?.item, eventId]);

  // const itinerary = await fetchItineraryById(us)
  const {
    _id,
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
    active,
  } = itinerary;

  const cardDropdownOptions = availableDatesTime
    .filter((date: { Date: string | Date }) => new Date(date.Date) > new Date())
    .map((date: { Date: string | Date }) => ({
      value: date.Date.toString(),
      label: format(new Date(date.Date), "dd/MM/yyyy hh:mm a"),
    }));
  const [preferenceTagNames, setPreferenceTagNames] = useState<string[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(cardDropdownOptions[0].value);
  const [isGuestAction, setIsGuestAction] = useState(false);
  const [text, setText] = useState<string>();
  const cardButtonText = "Book Itinerary";
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isNotifyAnimating, setIsNotifyAnimating] = React.useState(false);

  const closeModal = () => setIsModalOpen(false);

  // const { id } = useParams();
  const { id } = useUserStore();  
  const { currency } = useCurrencyStore();

  const convertedPrice = currencyExchange("EGP", price);
  const convertedDisplayPrice = convertedPrice ? convertedPrice.toFixed(0) : "N/A";
  React.useEffect(() => {
    if (id) {
      getUserById(id).then((user) => {
        // check if user is under 18 years old
        if (calculateAge(new Date(user.dob!)) < 18) {
          setIsButtonDisabled(true);
          setText("You must be 18 years or older to book this itinerary");
        }
      });
    }
  }, []);

  React.useEffect(() => {
    for (let i = 0; i < itinerary.preferenceTags.length; i++) {
      fetchPreferenceTagById(itinerary.preferenceTags[i]._id).then((tag) => {
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

          {isModalOpen && (
            <BookingModal
              parentBookingFunc={handleBookButtonClick}
              currency={currency}
              isOpen={isModalOpen}
              onClose={closeModal}
              price={Number(convertedDisplayPrice)}
              name={name}
              type={"Itinerary"}
              userId={id ?? ""}
              egpPrice={price}
            />
          )}

          <TouristHomePageNavigation loggedIn={id ? true : false} />
          <ItinerariesPageTemplate
            _id={_id}
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
              disabled={isButtonDisabled}
              onButtonClick={(active && !isButtonDisabled && !isGuestAction) ? handleBookButtonClick : handleNotifyButtonClick}
              onDateChange={(selectedDate) => setSelectedDate(selectedDate)}
              footerText={text}
              isNotifyAnimating={isNotifyAnimating}
            />
          </ItinerariesPageTemplate>
        </>
      )}
      <TouristHomePageNavigation /*loggedIn={id ? id !== "undefined" : false}*/ />
      <ItinerariesPageTemplate
        _id={_id}
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
