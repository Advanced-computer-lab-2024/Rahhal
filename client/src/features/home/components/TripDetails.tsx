import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { TActivity } from "@/features/advertiser/utils/advertiser-columns";
import { TItinerary } from "@/features/tour-guide/utils/tour-guide-columns";
import { updateBookingRequest } from "@/api-calls/booking-api-calls";
import { TRatingEntity } from "./RatingForm";
import { bookingType, RateableEntityType } from "@/utils/enums";
import { createRating } from "@/api-calls/rating-api-calls";
import { getUserById } from "@/api-calls/users-api-calls";
import { TRating } from "@/types/shared";
import { toast } from "@/hooks/use-toast";
import TouristHomePageNavigation from "./TouristHomePageNavigation";
import BookedActivityDetailsPage from "./activities/BookedActivityDetails";
import BookedItineraryDetailsPage from "./itineraries/BookedItineraryDetails";
import useUserStore from "@/stores/user-state-store";

export const handleTripRatingSubmit = async (
  values: Record<string, any>,
  eventId: string,
  eventType: RateableEntityType,
  userId: string,
  bookingId: string,
  ratingFormRef: React.RefObject<HTMLButtonElement>,
) => {
  const user = userId ? await getUserById(userId) : null;

  const ratingData: TRating = {
    userId: userId || "",
    userName: user?.username || "",
    rating: values.rating,
    review: values.comment,
  };

  await createRating(ratingData, eventType, eventId);

  toast({
    title: "Success",
    description: "Rating submitted successfully",
    duration: 5000,
  });

  // update 'rating' field in booking
  if (eventType == RateableEntityType.ACTIVITY || eventType == RateableEntityType.ITINERARY)
    await updateBookingRequest(bookingId, { rating: values.rating });
  else if (eventType == RateableEntityType.USER) {
    // update 'rated' field in user
    await updateBookingRequest(bookingId, { itineraryTourGuideRating: values.rating });
  }
  // refresh the page
  setTimeout(() => {
    window.location.reload();
  }, 2000);

  // close the dialog
  ratingFormRef.current?.click();
};

export const tripRatingEntity: Record<string, TRatingEntity> = {
  rating: {
    label: "How was your overall experience?",
    description: "",
    type: "rating",
  },
  comment: {
    label: "Care to share more?",
    description: "Your feedback is important to us!",
    type: "comment",
  },
};

export function TripDetails() {
  // const userId = useParams().id;
  const {id:userId} = useUserStore();
  const { booking } = useLocation().state;
  const ratingFormRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      {booking.type === bookingType.Activity && (
        <BookedActivityDetailsPage
          activity={booking.entity as TActivity}
          userId={userId ?? ""}
          initialBooking={booking}
          ratingFormRef={ratingFormRef}
        />
      )}

      {booking.type === bookingType.Itinerary && (
        <BookedItineraryDetailsPage
          itinerary={booking.entity as TItinerary}
          userId={userId ?? ""}
          initialBooking={booking}
          ratingFormRef={ratingFormRef}
        />
      )}
    </>
  );
}
