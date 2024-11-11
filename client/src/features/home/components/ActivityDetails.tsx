import React from "react";

import { Star, Tag } from "lucide-react";
import Review from "./Reviews";

import GoogleMap from "@/components/google-maps/GoogleMap";

import SharePopover from "@/components/SharePopover";

import { OverviewCard } from "./overview-card/OverViewCard";
import { TActivity } from "@/features/advertiser/utils/advertiser-columns";
import {
  calculateAverageRating,
  TRating,
} from "@/features/admin/utils/columns-definitions/activities-columns";
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
import { formatDate, formatTime } from "../utils/filter-lists/overview-card";
import { handleTripRatingSubmit, tripRatingEntity } from "./TripDetails";
import { RateableEntityType } from "@/utils/enums";
import { useCurrencyStore, useRatesStore } from "@/stores/currency-exchange-store";
import currencyExchange from "@/utils/currency-exchange";

interface ActivityDetailsProps {
  activity: TActivity;
  initialBooking: TPopulatedBooking | null;
  userId: string;
  ratingFormRef: React.RefObject<HTMLButtonElement>;
}

const ActivityDetailsPage: React.FC<ActivityDetailsProps> = ({
  activity,
  initialBooking,
  userId,
  ratingFormRef,
}) => {
  const {
    name,
    images,
    description,
    location,
    date,
    price,
    ratings,
    specialDiscount,
    owner,
    preferenceTags,
  } = activity;
  const [rating, setRating] = React.useState(0);
  const [ownerName, setOwnerName] = React.useState("");
  const [preferenceTagNames, setPreferenceTagNames] = React.useState<string[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = React.useState<string | null>(null);
  const [booking, setBooking] = React.useState<TPopulatedBooking | null>(initialBooking);
  const { currency } = useCurrencyStore();
  const { rates } = useRatesStore();

  React.useEffect(() => {
    setRating(calculateAverageRating(activity.ratings));
  }, [ratings]);

  // update selectedTicket every time currency changes
  React.useEffect(() => {
    if (booking) {
      // adjust the selected ticket price based on the currency
      const selectedPrice = booking.selectedPrice;

      const foundKey = Object.keys(price).find((key) => price[key] === selectedPrice);

      let convertedSelectedPrice = selectedPrice;

      if (rates.rates) {
        const rateOfEURToOld = rates.rates["EGP"];
        const rateOfEURToNew = rates.rates[currency];
        convertedSelectedPrice = (selectedPrice * rateOfEURToNew) / rateOfEURToOld;
      }
      const selectedDisplayPrice = convertedSelectedPrice.toFixed(0);

      setSelectedTicket(foundKey ? `${foundKey} - ${currency} ${selectedDisplayPrice}` : null);
    }
  }, [currency]);

  React.useEffect(() => {
    getUserById(activity.owner).then((user) => {
      setOwnerName(user.firstName + " " + user.lastName);
    });
  }, [owner]);

  React.useEffect(() => {
    for (let i = 0; i < activity.preferenceTags.length; i++) {
      fetchPreferenceTagById(activity.preferenceTags[i]._id).then((tag) => {
        setPreferenceTagNames((prev) => [(tag as { _id: string; name: string }).name]);
      });
    }
  }, [preferenceTags]);

  React.useEffect(() => {
    if (userId == "undefined" || userId == undefined) {
      setIsButtonDisabled(true);
      return;
    }
    getUserById(userId).then((user) => {
      // check if user is not approved or is under 18 years old or if the booking is cancelled & the selected date has passed
      if (
        user.approved === false ||
        (user.dob && user.dob > new Date(new Date().setFullYear(new Date().getFullYear() - 18))) ||
        (booking &&
          booking?.status === "cancelled" &&
          booking?.selectedDate &&
          selectedDate &&
          new Date(selectedDate) < new Date()) ||
        (!booking && selectedDate && new Date(selectedDate) < new Date()) ||
        (booking && booking?.rating !== 0) ||
        !activity.isBookingOpen
      ) {
        setIsButtonDisabled(true);
      }
    });
  }, []);

  // check if user has already booked this activity if booking is null
  React.useEffect(() => {
    if (booking && booking._id !== "") {
      // set the selected ticket based on the selected price and price object
      // NOTE: THIS WILL NOT WORK IF THE PRICES ARE NOT UNIQUE
      let selectedPrice = booking.selectedPrice;

      const foundKey = Object.keys(price).find((key) => price[key] === selectedPrice);

      let convertedSelectedPrice = selectedPrice;

      if (rates.rates) {
        const rateOfEURToOld = rates.rates["EGP"];
        const rateOfEURToNew = rates.rates[currency];
        convertedSelectedPrice = (selectedPrice * rateOfEURToNew) / rateOfEURToOld;
      }
      const selectedDisplayPrice = convertedSelectedPrice.toFixed(0);

      setSelectedTicket(foundKey ? `${foundKey} - ${currency} ${selectedDisplayPrice}` : null);
    }

    if (booking?._id !== "" || userId === "undefined") return;

    fetchUserBookings(userId).then((bookings) => {
      const userBookings = bookings as unknown as TPopulatedBooking[];
      const userBooking = userBookings.find(
        (booking) => booking.entity._id === activity._id && booking.type === "activity",
      );

      if (userBooking) {
        setBooking(userBooking);
        // change bookingId in URL
        setTimeout(() => {
          window.location.href = `/my-trips-details?userId=${userId}&eventId=${activity._id}&bookingId=${userBooking._id}&type=activity`;
        }, 2000);
      }
    });
  }, []);

  const handleButtonClick = () => {
    if (booking?._id === "") {
      createBooking({
        user: userId,
        entity: activity._id ?? "",
        type: "activity",
        status: "upcoming",
        selectedPrice: booking.selectedPrice,
        selectedDate: selectedDate ? new Date(selectedDate) : new Date(),
      }).then((response) => {
        const booking = response as TPopulatedBooking;
        setBooking(booking);
        addLoyalityPoints(userId, booking.selectedPrice);
        // update bookingId in URL
        setTimeout(() => {
          window.location.href = `/my-trips-details?userId=${userId}&eventId=${activity._id}&bookingId=${booking._id}&type=activity`;
        }, 2000);
      });

      return;
    }

    if (booking && booking?.status === "cancelled") {
      if (booking?._id) {
        updateBookingRequest(booking._id, {
          status: "upcoming",
          selectedDate: selectedDate ? new Date(selectedDate) : undefined,
          selectedPrice: booking.selectedPrice,
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
      ratingFormRef.current?.click();
    } else {
      // cancel activity if there is still 48 hours left
      if (booking && booking?._id && booking.selectedDate) {
        const currentDate = new Date();
        const activityDate = new Date(activity.date);
        const difference = Math.abs(activityDate.getTime() - currentDate.getTime());
        const hours = difference / (1000 * 60 * 60);
        if (hours > 48) {
          updateBookingRequest(booking._id, { status: "cancelled" });
          refundMoney(userId, booking.selectedPrice);
          setBooking({ ...booking, status: "cancelled" });
        } else {
          toast({
            title: "Error",
            description: "You can't cancel this activity anymore as it is less than 48 hours away",
            duration: 5000,
          });
        }
      }
    }
  };

  const onTicketSelect = (index: number) => {
    let selectedPrice = price[Object.keys(price)[index]];

    let convertedSelectedPrice = selectedPrice;

    if (rates.rates) {
      const rateOfEURToOld = rates.rates["EGP"];
      const rateOfEURToNew = rates.rates[currency];
      convertedSelectedPrice = (selectedPrice * rateOfEURToNew) / rateOfEURToOld;
    }

    const selectedDisplayPrice = convertedSelectedPrice.toFixed(0);

    setBooking({ ...booking!, selectedPrice: selectedPrice });

    setSelectedTicket(`${Object.keys(price)[index]} - ${currency} ${selectedDisplayPrice}`);
  };

  const activityDate = new Date(date);
  const formattedDate = formatDate(activityDate);
  const formattedTime = formatTime(activityDate);

  const cardButtonText =
    !booking || booking?.status === "cancelled"
      ? "Book Activity"
      : booking && booking?.status === "completed"
        ? "Review Activity"
        : "Cancel Activity";

  const cardDropdownOptions =
    booking && booking?.status === "cancelled"
      ? [{ value: date.toString(), label: formattedDate + " " + formattedTime }]
      : undefined;

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

  const convertedPrice = currencyExchange("EGP", booking?.selectedPrice ?? 0);
  const displayPrice = convertedPrice ? convertedPrice.toFixed(0) : "N/A";

  return (
    <div>
      <RatingFormDialog
        buttonRef={ratingFormRef}
        ratingEntities={tripRatingEntity}
        onSubmit={(values: Record<string, any>) =>
          activity._id
            ? handleTripRatingSubmit(
                values,
                activity._id,
                RateableEntityType.ACTIVITY,
                userId,
                booking?._id ?? "",
                ratingFormRef,
              )
            : null
        }
      />
      <div className="grid grid-cols-3 gap-8 px-2">
        {/* Left Column - Images and Details */}
        <div className="space-y-6 col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex">
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
          </div>

          {/* Author and Description */}
          <div className="space-y-4">
            <p className="font-semibold">By: {ownerName}</p>
            <p className="text-gray-600">{description}</p>
          </div>
          <div className="w-1/2 ml-[25%]">
            <GoogleMap
              isEditable={false}
              location={{ lat: location.latitude, lng: location.longitude }}
              setLocation={() => {}}
            />
          </div>
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
            date={booking ? formattedDate : undefined}
            time={booking ? formattedTime : undefined}
            dropdownOptions={cardDropdownOptions}
            disabled={isButtonDisabled && !selectedTicket}
            onButtonClick={handleButtonClick}
            discountedPrice={
              specialDiscount != 0 && booking && convertedPrice
                ? convertedPrice - (convertedPrice * specialDiscount) / 100
                : undefined
            }
            onTicketSelect={booking && booking?.status === "cancelled" ? onTicketSelect : undefined}
            tickets={
              booking && booking?.status === "cancelled"
                ? tickets
                : selectedTicket
                  ? [selectedTicket]
                  : []
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailsPage;
