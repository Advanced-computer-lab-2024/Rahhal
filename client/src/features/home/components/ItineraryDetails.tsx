import React from "react";

import { Star, Tag } from "lucide-react";
import Review from "./Reviews";

import GoogleMap from "@/components/google-maps/GoogleMap";
import SharePopover from "@/components/SharePopover";

import { OverviewCard } from "./overview-card/OverViewCard";

import { calculateAverageRating } from "@/features/admin/utils/columns-definitions/activities-columns";
import { TPopulatedBooking } from "../types/home-page-types";
import { addLoyalityPoints, getUserById, refundMoney } from "@/api-calls/users-api-calls";
import { fetchPreferenceTagById } from "@/api-calls/preference-tags-api-calls";
import {
  createBooking,
  fetchUserBookings,
  updateBookingRequest,
} from "@/api-calls/booking-api-calls";
import { toast } from "@/hooks/use-toast";
import { RatingFormDialog } from "./RatingFormDialog";
import { TItinerary } from "@/features/tour-guide/utils/tour-guide-columns";
import { formatDate, formatTime } from "../utils/filter-lists/overview-card";

import { ActivitiesTimeline } from "./ActivitiesTimeline";
import { FaAccessibleIcon, FaLanguage } from "react-icons/fa6";
import { handleTripRatingSubmit, tripRatingEntity } from "./TripDetails";

import { RateableEntityType } from "@/utils/enums";
import { useCurrencyStore } from "@/stores/currency-exchange-store";
import currencyExchange from "@/utils/currency-exchange";

interface ItineraryDetailsProps {
  itinerary: TItinerary;
  initialBooking: TPopulatedBooking | null;
  userId: string;
  ratingFormRef: React.RefObject<HTMLButtonElement>;
}

const ItineraryDetailsPage: React.FC<ItineraryDetailsProps> = ({
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
    locations,
    price,
    pickUpLocation,
    dropOffLocation,
    availableDatesTime,
    ratings,
    timeline,
    accessibility,
    languages,
  } = itinerary;

  const [rating, setRating] = React.useState(0);
  const [ownerName, setOwnerName] = React.useState("");
  const [preferenceTagNames, setPreferenceTagNames] = React.useState<string[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const [booking, setBooking] = React.useState<TPopulatedBooking | null>(initialBooking);
  const tourGuideRatingFormRef = React.useRef<HTMLButtonElement>(null);

  const { currency } = useCurrencyStore();

  React.useEffect(() => {
    setRating(calculateAverageRating(itinerary.ratings));
  }, [itinerary.ratings]);

  React.useEffect(() => {
    getUserById(itinerary.owner).then((user) => {
      setOwnerName(user.firstName + " " + user.lastName);
    });
  }, [itinerary.owner]);

  React.useEffect(() => {
    for (let i = 0; i < itinerary.preferenceTags.length; i++) {
      fetchPreferenceTagById(itinerary.preferenceTags[i]._id).then((tag) => {
        setPreferenceTagNames((prev) => [(tag as { _id: string; name: string }).name]);
      });
    }
  }, [itinerary.preferenceTags]);

  React.useEffect(() => {
    getUserById(userId).then((user) => {
      // check if user is not approved or is under 18 years old
      if (
        user.approved === false ||
        (user.dob && user.dob > new Date(new Date().setFullYear(new Date().getFullYear() - 18))) ||
        (booking &&
          booking?.status === "cancelled" &&
          booking?.selectedDate &&
          selectedDate &&
          new Date(selectedDate) < new Date())
      ) {
        setIsButtonDisabled(true);
      }
    });
  }, [selectedDate]);

  React.useEffect(() => {
    if (userId == "undefined" || userId == undefined) {
      setIsButtonDisabled(true);
      return;
    }
  }, [userId]);

  // check if user has already booked this itinerary if booking is null
  React.useEffect(() => {
    if (booking?._id !== "" || userId === "undefined") return;

    fetchUserBookings(userId).then((bookings) => {
      const userBookings = bookings as unknown as TPopulatedBooking[];
      const userBooking = userBookings.find(
        (booking) => booking.entity._id === itinerary._id && booking.type === "itinerary",
      );

      if (userBooking) {
        setBooking(userBooking);
        // change bookingId in URL
        setTimeout(() => {
          window.location.href = `/my-trips-details?userId=${userId}&eventId=${itinerary._id}&bookingId=${userBooking._id}&type=itinerary`;
        }, 500);
      }
    });
  }, []);

  const handleButtonClick = () => {
    if (booking?._id == "") {
      createBooking({
        user: userId,
        entity: itinerary._id ?? "",
        type: "itinerary",
        status: "upcoming",
        selectedPrice: price,
        selectedDate: selectedDate ? new Date(selectedDate) : new Date(),
      }).then((booking) => {
        const response = booking as TPopulatedBooking;
        setBooking(response);
        // update bookingId in the URL
        setTimeout(() => {
          window.location.href = `/my-trips-details?userId=${userId}&eventId=${itinerary._id}&bookingId=${response._id}&type=itinerary`;
        }, 500);
      });

      return;
    }

    if (booking && booking?.status === "cancelled") {
      if (booking?._id) {
        updateBookingRequest(booking._id, {
          status: "upcoming",
          selectedDate: selectedDate ? new Date(selectedDate) : undefined,
        });
        addLoyalityPoints(userId, booking.selectedPrice);
        setBooking({
          ...booking,
          status: "upcoming",
          selectedDate: selectedDate ? new Date(selectedDate) : new Date(),
        });
      }
    } else if (booking && booking?.status === "completed") {
      // redirect to review page
      itineraryRatingFormRef.current?.click();
    } else {
      // cancel itinerary if there is still 48 hours left
      if (booking && booking?._id && booking.selectedDate) {
        const currentDate = new Date();
        const selectedDate = new Date(booking.selectedDate);
        const difference = Math.abs(selectedDate.getTime() - currentDate.getTime());
        const hours = difference / (1000 * 60 * 60);
        if (hours > 48) {
          updateBookingRequest(booking._id, { status: "cancelled" });
          refundMoney(userId, booking.selectedPrice);
          setBooking({ ...booking, status: "cancelled" });
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
    (booking && booking?.status === "cancelled") || !booking
      ? "Book Itinerary"
      : booking && booking?.status === "completed"
        ? "Review Itinerary"
        : "Cancel Itinerary";

  const cardDropdownOptions =
    booking && booking?.status === "cancelled" && availableDatesTime
      ? availableDatesTime.map((date) => ({
          value: date.Date.toString(),
          label: formatDate(new Date(date.Date)) + " " + formatTime(new Date(date.Time)),
        }))
      : undefined;

  const convertedPrice = currencyExchange("EGP", booking?.selectedPrice ?? 0);
  const displayPrice = convertedPrice ? convertedPrice.toFixed(0) : "N/A";

  return (
    <div>
      <RatingFormDialog
        buttonRef={itineraryRatingFormRef}
        ratingEntities={tripRatingEntity}
        onSubmit={(values) => {
          itinerary._id &&
            handleTripRatingSubmit(
              values,
              itinerary._id,
              RateableEntityType.ITINERARY,
              userId,
              itineraryRatingFormRef,
            );
        }}
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
              tourGuideRatingFormRef,
            );
        }}
      />
      <div className="grid grid-cols-3 gap-8 px-2">
        {/* Left Column - Images and Details */}
        <div className="space-y-6 col-span-2">
          <div className="grid grid-cols-5 gap-4">
            <div className="flex col-span-4">
              <h1 className="text-3xl font-bold">{name}</h1>

              {/* Rating */}
              <div>
                <div className="flex mt-5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <h6 className="flex-1 text-[0.5rem] text-gray-600 mt-5">{ratings.length} reviews</h6>
            </div>

            <div className="flex justify-end">
              <div className="p-0">
                <SharePopover link={window.location.href} />
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-4">
            <img src={images[0]} className="w-full h-full object-cover rounded-lg" />

            <div className="grid grid-cols-2 gap-2">
              {images.slice(1).map((image, index) => (
                <div key={index} className="relative">
                  <img src={image} className="w-full h-full object-cover rounded-lg" />
                </div>
              ))}
            </div>
          </div>

          {/* Horizontal Line */}
          <hr className="border-t border-gray-200" />

          {/* Tags */}
          <div className="flex space-x-2">
            {preferenceTagNames.map((tag, index) => (
              <div
                key={index}
                className={
                  "flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                }
              >
                <Tag className="w-4 h-4 mr-1" />

                {tag}
              </div>
            ))}

            {/* Accessibility */}
            {accessibility.trim() !== "" && (
              <div
                className={
                  "flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                }
              >
                <FaAccessibleIcon className="w-4 h-4 mr-1" />

                {accessibility}
              </div>
            )}

            {/* Languages */}
            {languages.map((language, index) => (
              <div
                key={index}
                className={
                  "flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                }
              >
                <FaLanguage className="w-4 h-4 mr-1" />

                {language}
              </div>
            ))}
          </div>

          {/* Author and Description */}
          <div className="space-y-4">
            <p className="font-semibold">By: {ownerName}</p>
            <p className="text-gray-600">{description}</p>
          </div>
          <h3 className="font-bold"> Pick Up Location: </h3>
          <div className="w-1/2 ml-[25%]">
            <GoogleMap
              isEditable={false}
              location={{ lat: pickUpLocation.latitude, lng: pickUpLocation.longitude }}
              setLocation={() => {}}
            />
          </div>
          <h3 className="font-bold"> Drop Off Location: </h3>
          <div className="w-1/2 ml-[25%]">
            <GoogleMap
              isEditable={false}
              location={{ lat: dropOffLocation.latitude, lng: dropOffLocation.longitude }}
              setLocation={() => {}}
            />
          </div>

          {/* Activities */}
          <h3 className="font-bold"> Timeline: {timeline} </h3>
          <ActivitiesTimeline
            activities={activities}
            durationOfActivities={durationOfActivities}
            locations={locations}
          />

          {/* Reviews */}
          <Review reviews={ratings} />
        </div>

        {/* Right Column - Booking Card */}
        <div className="justify-center items-center">
          <OverviewCard
            currency={currency}
            originalPrice={displayPrice}
            buttonText={cardButtonText}
            buttonColor={booking?.status === "upcoming" ? "red" : "gold"}
            button2Text={
              booking && booking?.status === "completed" ? "Review Tour Guide" : undefined
            }
            onButton2Click={() => tourGuideRatingFormRef.current?.click()}
            button2Color="gold"
            date={
              (booking && booking?.status === "upcoming") ||
              (booking && booking?.status === "completed")
                ? formatDate(new Date(booking.selectedDate))
                : undefined
            }
            time={
              (booking && booking?.status === "upcoming") ||
              (booking && booking?.status === "completed")
                ? formatDate(new Date(booking.selectedDate))
                : undefined
            }
            dropdownOptions={cardDropdownOptions}
            dateOptions={booking ? booking.status === "cancelled" : undefined}
            disabled={isButtonDisabled}
            onButtonClick={handleButtonClick}
            onDateChange={(selectedDate) => setSelectedDate(selectedDate)}
          />
        </div>
      </div>
    </div>
  );
};

export default ItineraryDetailsPage;
