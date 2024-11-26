import { OverviewCard } from "../overview-card/OverViewCard";
import { TPopulatedBooking } from "../../types/home-page-types";
import { addLoyalityPoints, getUserById, refundMoney } from "@/api-calls/users-api-calls";
import { fetchPreferenceTagById } from "@/api-calls/preference-tags-api-calls";
import { createBooking, updateBookingRequest } from "@/api-calls/booking-api-calls";
import { TItinerary } from "@/features/tour-guide/utils/tour-guide-columns";
import { useCurrencyStore } from "@/stores/currency-exchange-store";
import { useEffect, useRef, useState } from "react";
import { bookingStatus, bookingType } from "@/utils/enums";
import { toast } from "@/hooks/use-toast";
import { formatDate, formatTime } from "../../utils/filter-lists/overview-card";
import ItinerariesPageTemplate from "../ItinerariesPageTemplate";
import { format } from "date-fns";

interface BookedItineraryDetailsProps {
  itinerary: TItinerary;
  initialBooking: TPopulatedBooking | null;
  userId: string;
  ratingFormRef: React.RefObject<HTMLButtonElement>;
}

const BookedItineraryDetailsPage: React.FC<BookedItineraryDetailsProps> = ({
  itinerary,
  initialBooking,
  userId,
  ratingFormRef: itineraryRatingFormRef,
}) => {
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
    preferenceTags,
    accessibility,
    languages,
    ownerName,
  } = itinerary;
  const [preferenceTagNames, setPreferenceTagNames] = useState<string[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [booking, setBooking] = useState<TPopulatedBooking | null>(initialBooking);
  const tourGuideRatingFormRef = useRef<HTMLButtonElement>(null);

  const { currency } = useCurrencyStore();

  useEffect(() => {
    for (let i = 0; i < itinerary.preferenceTags.length; i++) {
      fetchPreferenceTagById(itinerary.preferenceTags[i]._id).then((tag) => {
        setPreferenceTagNames((prev) => [(tag as { _id: string; name: string }).name]);
      });
    }
  }, [preferenceTags]);

  useEffect(() => {
    getUserById(userId).then((user) => {
      // check if user is not approved or is under 18 years old
      if (
        (booking &&
          booking?.status === bookingStatus.Cancelled &&
          booking?.selectedDate &&
          selectedDate &&
          new Date(selectedDate) < new Date()) ||
        (booking && booking?.rating !== 0)
      ) {
        setIsButtonDisabled(true);
      }
      // check if the itinerary is cancelled
      if (booking && booking?.status === bookingStatus.Cancelled) {
        setIsButtonDisabled(true);
      }
    });
  }, [selectedDate]);

  const handleButtonClick = () => {
    if (booking && booking?.status === bookingStatus.Completed) {
      // redirect to review page
      itineraryRatingFormRef.current?.click();
    } else {
      // cancel itinerary if there is still 48 hours left
      if (booking && booking?._id && booking.selectedDate) {
        const currentDate = new Date();
        const itineraryDate = new Date(booking.selectedDate);
        const difference = Math.abs(itineraryDate.getTime() - currentDate.getTime());
        const hours = difference / (1000 * 60 * 60);
        if (hours > 48) {
          updateBookingRequest(booking._id, { status: bookingStatus.Cancelled });
          refundMoney(userId, booking.selectedPrice);
          setBooking({ ...booking, status: bookingStatus.Cancelled });
        } else {
          toast({
            title: "Error",
            description: "You can't cancel this itinerary anymore as it is less than 48 hours away",
            duration: 5000,
          });
        }
      }
    }
  };

  const cardButtonText =
    (booking && booking?.status === bookingStatus.Cancelled) || !booking
      ? "Cancelled"
      : booking && booking?.status === bookingStatus.Completed
        ? "Review Itinerary"
        : "Cancel Itinerary";

  return (
    <div>
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
          buttonColor={
            booking?.status === bookingStatus.Upcoming || bookingStatus.Cancelled ? "red" : "gold"
          }
          button2Text={
            booking && booking?.status === bookingStatus.Completed ? "Review Tour Guide" : undefined
          }
          onButton2Click={() => tourGuideRatingFormRef.current?.click()}
          button2Color="gold"
          date={booking ? formatDate(new Date(booking.selectedDate)) : undefined}
          time={booking ? formatTime(new Date(booking.selectedDate)) : undefined}
          disabled={isButtonDisabled && !selectedDate}
          disabled2={booking ? booking.itineraryTourGuideRating !== 0 : false}
          onButtonClick={handleButtonClick}
          onDateChange={(selectedDate) => setSelectedDate(selectedDate)}
        />
      </ItinerariesPageTemplate>
    </div>
  );
};

export default BookedItineraryDetailsPage;
