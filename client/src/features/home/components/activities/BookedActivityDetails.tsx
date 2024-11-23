import React from "react";
import { OverviewCard } from "../overview-card/OverViewCard";
import { TActivity } from "@/features/advertiser/utils/advertiser-columns";
import { TPopulatedBooking } from "../../types/home-page-types";
import { addLoyalityPoints, getUserById, refundMoney } from "@/api-calls/users-api-calls";
import { fetchPreferenceTagById } from "@/api-calls/preference-tags-api-calls";
import { createBooking, updateBookingRequest } from "@/api-calls/booking-api-calls";
import { toast } from "@/hooks/use-toast";
import { RatingFormDialog } from "../RatingFormDialog";
import { formatDate, formatTime } from "../../utils/filter-lists/overview-card";
import { handleTripRatingSubmit, tripRatingEntity } from "../TripDetails";
import { bookingStatus, bookingType, RateableEntityType } from "@/utils/enums";
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
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = React.useState<string | null>(null);
  const [booking, setBooking] = React.useState<TPopulatedBooking | null>(initialBooking);
  const [sPrice, setSPrice] = React.useState<number | undefined>(undefined);
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
    if (
      (booking &&
        booking?.status === bookingStatus.Cancelled &&
        booking?.selectedDate &&
        selectedDate &&
        new Date(selectedDate) < new Date()) ||
      (!booking && selectedDate && new Date(selectedDate) < new Date()) ||
      (booking && booking?.rating !== 0)
    ) {
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

  const handleButtonClick = () => {
    if (booking && booking?.status === bookingStatus.Cancelled) {
      if (booking?._id) {
        createBooking({
          user: userId,
          entity: activity._id ?? "",
          type: bookingType.Activity,
          selectedPrice: booking.selectedPrice,
          selectedDate: selectedDate ? new Date(selectedDate) : activity.date,
        }).then((response) => {
          const booking = response as TPopulatedBooking;
          setBooking(booking);
          addLoyalityPoints(userId, booking.selectedPrice);
        });
      }
    } else if (booking && booking?.status === bookingStatus.Completed) {
      // redirect to review page
      ratingFormRef.current?.click();
    } else {
      // cancel activity if there is still 48 hours left
      if (booking && booking?._id && booking.selectedDate) {
        const currentDate = new Date();
        const activityDate = new Date(booking.selectedDate);
        const difference = Math.abs(activityDate.getTime() - currentDate.getTime());
        const hours = difference / (1000 * 60 * 60);
        if (hours > 48) {
          updateBookingRequest(booking._id, { status: bookingStatus.Cancelled });
          refundMoney(userId, booking.selectedPrice);
          setBooking({ ...booking, status: bookingStatus.Cancelled });
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
    setSPrice(price[Object.keys(price)[index]]);
  };

  const activityDate = new Date(date);
  const formattedDate = formatDate(activityDate);
  const formattedTime = formatTime(activityDate);

  const cardButtonText =
    !booking || booking?.status === bookingStatus.Cancelled
      ? "Book Activity"
      : booking && booking.status == bookingStatus.Completed
        ? "Review Activity"
        : "Cancel Activity";

  const cardDropdownOptions =
    booking && booking?.status === bookingStatus.Cancelled
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
          originalPrice={sPrice}
          buttonText={cardButtonText}
          buttonColor={booking?.status === "upcoming" ? "red" : "gold"}
          date={booking ? formattedDate : undefined}
          time={booking ? formattedTime : undefined}
          dropdownOptions={cardDropdownOptions}
          disabled={isButtonDisabled && !selectedTicket}
          onButtonClick={handleButtonClick}
          discount={specialDiscount}
          onTicketSelect={booking && booking?.status === "cancelled" ? onTicketSelect : undefined}
          tickets={
            booking && booking?.status === "cancelled"
              ? tickets
              : selectedTicket
                ? [selectedTicket]
                : []
          }
        />
      </DetailsPageTemplateProps>
    </div>
  );
};

export default BookedActivityDetailsPage;
