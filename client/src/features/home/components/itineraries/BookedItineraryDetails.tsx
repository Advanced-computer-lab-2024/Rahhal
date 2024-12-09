import { OverviewCard } from "../overview-card/OverViewCard";
import { TPopulatedBooking } from "../../types/home-page-types";
import { getUserById, refundMoney } from "@/api-calls/users-api-calls";
import { fetchPreferenceTagById } from "@/api-calls/preference-tags-api-calls";
import { fetchBookingById, updateBookingRequest } from "@/api-calls/booking-api-calls";
import { TItinerary } from "@/features/tour-guide/utils/tour-guide-columns";
import { useCurrencyStore } from "@/stores/currency-exchange-store";
import { useEffect, useRef, useState } from "react";
import { bookingStatus, RateableEntityType } from "@/utils/enums";
import { toast } from "@/hooks/use-toast";
import { formatDate, formatTime } from "../../utils/filter-lists/overview-card";
import ItinerariesPageTemplate from "../ItinerariesPageTemplate";
import { RatingFormDialog } from "../RatingFormDialog";
import { handleTripRatingSubmit, tripRatingEntity } from "../TripDetails";

interface BookedItineraryDetailsProps {
  itinerary: TItinerary;
  initialBooking: TPopulatedBooking | null;
  userId: string;
  discount: number;
  ratingFormRef: React.RefObject<HTMLButtonElement>;
}

const BookedItineraryDetailsPage: React.FC<BookedItineraryDetailsProps> = ({
  itinerary,
  initialBooking,
  userId,
  ratingFormRef: itineraryRatingFormRef,
  discount,
}) => {
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
  const [text, setText] = useState<string>();
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
      // check if the itinerary is cancelled
      if (booking && booking?.rating !== 0) {
        setIsButtonDisabled(true);
      }
      

      if (booking && booking?.status === bookingStatus.Cancelled) {
        setIsButtonDisabled(true);
      }
    });
  }, [selectedDate]);

  // to make sure that itinerary remains canceled if user used browser navigation to go back
  useEffect(() => {
    const checkBookingStatus = async () => {
      try {
        if (booking && booking._id) {
          const latestBooking = await fetchBookingById(booking._id);
          if (latestBooking.status === bookingStatus.Cancelled) {
            setIsButtonDisabled(true);
            setBooking({ ...booking, status: bookingStatus.Cancelled });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkBookingStatus();
  }, []);

  useEffect(() => {
    if (booking && booking?._id && booking.selectedDate) {
      const currentDate = new Date();
      const itineraryDate = new Date(booking.selectedDate);
      const difference = Math.abs(itineraryDate.getTime() - currentDate.getTime());
      const hours = difference / (1000 * 60 * 60);
      if (hours < 48) {
        setIsButtonDisabled(true);
        setText("You can't cancel this itinerary anymore as it is less than 48 hours away");
      }
    }
  }, [booking]);

  const handleButtonClick = () => {
    if (booking && booking?.status === bookingStatus.Completed) {
      // redirect to review page
      itineraryRatingFormRef.current?.click();
    } else {
      // cancel itinerary if there is still 48 hours left
      if (booking && booking?._id && booking.selectedDate) {
        // If the text field is not empty, this means that the user has passed the 48 hours limit
        if (!text) {
          const price =
            booking.selectedPrice - booking.selectedPrice * ((booking.discount ?? 0) / 100);
          updateBookingRequest(booking._id, { status: bookingStatus.Cancelled });
          refundMoney(userId, price);
          setBooking({ ...booking, status: bookingStatus.Cancelled });
          setIsButtonDisabled(true);
          toast({
            title: "Success",
            description: `You have successfully cancelled the itinerary, your wallet has been refunded by ${currency} ${price}`,
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
      <RatingFormDialog
        buttonRef={itineraryRatingFormRef}
        ratingEntities={tripRatingEntity}
        onSubmit={(values: Record<string, any>) =>
          itinerary._id
            ? handleTripRatingSubmit(
                values,
                itinerary._id,
                RateableEntityType.ITINERARY,
                userId,
                booking?._id ?? "",
                itineraryRatingFormRef,
              )
            : null
        }
      />
      <RatingFormDialog
        buttonRef={tourGuideRatingFormRef}
        ratingEntities={tripRatingEntity}
        onSubmit={(values) => {
          itinerary.owner &&
            handleTripRatingSubmit(
              values,
              itinerary.owner,
              RateableEntityType.USER,
              userId,
              booking?._id ?? "",
              tourGuideRatingFormRef,
            );
        }}
      />
      
      <ItinerariesPageTemplate
        _id={_id ?? ""}
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
          disabled={isButtonDisabled}
          disabled2={booking ? booking.itineraryTourGuideRating !== 0 : false}  
          onButtonClick={handleButtonClick}
          onDateChange={(selectedDate) => setSelectedDate(selectedDate)}
          footerText={text}
          promocodeDiscount={discount}
        />
      </ItinerariesPageTemplate>
    </div>
  );
};

export default BookedItineraryDetailsPage;
