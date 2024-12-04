import React from "react";
import { OverviewCard } from "../overview-card/OverViewCard";
import { TActivity } from "@/features/advertiser/utils/advertiser-columns";
import { TPopulatedBooking } from "../../types/home-page-types";
import { getUserById, refundMoney } from "@/api-calls/users-api-calls";
import { fetchPreferenceTagById } from "@/api-calls/preference-tags-api-calls";
import { fetchBookingById, updateBookingRequest } from "@/api-calls/booking-api-calls";
import { toast } from "@/hooks/use-toast";
import { RatingFormDialog } from "../RatingFormDialog";
import { formatDate, formatTime } from "../../utils/filter-lists/overview-card";
import { handleTripRatingSubmit, tripRatingEntity } from "../TripDetails";
import { bookingStatus, RateableEntityType } from "@/utils/enums";
import { useCurrencyStore, useRatesStore } from "@/stores/currency-exchange-store";
import DetailsPageTemplateProps from "../DetailsPageTemplate";

interface BookedActivityDetailsProps {
  activity: TActivity;
  initialBooking: TPopulatedBooking;
  userId: string;
  ratingFormRef: React.RefObject<HTMLButtonElement>;
}

const BookedActivityDetailsPage: React.FC<BookedActivityDetailsProps> = ({
  activity,
  initialBooking,
  userId,
  ratingFormRef,
}) => {
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
    owner,
    preferenceTags,
  } = activity;
  const [ownerName, setOwnerName] = React.useState("");
  const [preferenceTagNames, setPreferenceTagNames] = React.useState<string[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [selectedTicket, setSelectedTicket] = React.useState<string | null>(null);
  const [booking, setBooking] = React.useState<TPopulatedBooking | null>(initialBooking);
  const [text, setText] = React.useState<string>();
  const { currency } = useCurrencyStore();
  const { rates } = useRatesStore();

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
    // check if booking is already rated

    if (booking && booking?.rating !== 0) {
      setIsButtonDisabled(true);
    }
    // check if the activity is cancelled
    if (booking && booking?.status === bookingStatus.Cancelled) {
      setIsButtonDisabled(true);
    }
  }, []);

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
  }, []);

  // to make sure that activity remains canceled if user used browser navigation to go back
  React.useEffect(() => {
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

  React.useEffect(() => {
    if (booking && booking?._id && booking.selectedDate) {
      const currentDate = new Date();
      const itineraryDate = new Date(booking.selectedDate);
      const difference = Math.abs(itineraryDate.getTime() - currentDate.getTime());
      const hours = difference / (1000 * 60 * 60);
      if (hours < 48) {
        setIsButtonDisabled(true);
        setText("You can't cancel this activity anymore as it is less than 48 hours away");
      }
    }
  }, [booking]);

  const handleButtonClick = () => {
    if (booking && booking?.status === bookingStatus.Completed) {
      // redirect to review page
      ratingFormRef.current?.click();
    } else {
      // cancel activity if there is still 48 hours left
      if (booking && booking?._id && booking.selectedDate) {
        if (!text) {
          updateBookingRequest(booking._id, { status: bookingStatus.Cancelled });
          refundMoney(userId, booking.selectedPrice);
          setBooking({ ...booking, status: bookingStatus.Cancelled });
          booking.status = bookingStatus.Cancelled;
          setIsButtonDisabled(true);
          toast({
            title: "Success",
            description: `You have successfully cancelled the Activity, your wallet has been refunded by ${currency} ${booking.selectedPrice}`,
            duration: 5000,
          });
        }
      }
    }
  };

  const cardButtonText =
    !booking || booking?.status === bookingStatus.Cancelled
      ? "Cancelled"
      : booking && booking.status == bookingStatus.Completed
        ? "Review Activity"
        : "Cancel Activity";

  const activityDate = new Date(date);
  const formattedDate = formatDate(activityDate);
  const formattedTime = formatTime(activityDate);

  const cardDropdownOptions =
    booking && booking?.status === bookingStatus.Cancelled
      ? [{ value: date.toString(), label: formattedDate + " " + formattedTime }]
      : undefined;

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
      <DetailsPageTemplateProps
        _id={_id ?? ""}
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
          originalPrice={booking ? booking.selectedPrice : undefined}
          buttonText={cardButtonText}
          buttonColor={
            booking?.status === bookingStatus.Upcoming || bookingStatus.Cancelled ? "red" : "gold"
          }
          date={booking ? formattedDate : undefined}
          time={booking ? formattedTime : undefined}
          dropdownOptions={cardDropdownOptions}
          disabled={isButtonDisabled || booking?.status === bookingStatus.Cancelled}
          onButtonClick={handleButtonClick}
          discount={specialDiscount}
          tickets={selectedTicket ? [selectedTicket] : []}
          footerText={text}
        />
      </DetailsPageTemplateProps>
    </div>
  );
};

export default BookedActivityDetailsPage;
