import React from "react";

import { Star, Tag } from "lucide-react";
import Review from "./Reviews";

import GoogleMap from "@/components/google-maps/GoogleMap";
import { IoMdPricetag } from "react-icons/io";
import SharePopover from "@/components/SharePopover";

import { OverviewCard } from "./overview-card/OverViewCard";
import { TActivity } from "@/features/advertiser/utils/advertiser-columns";
import { calculateAverageRating } from "@/features/admin/utils/columns-definitions/activities-columns";
import { TBookingStatus, TBookingType, TPopulatedBooking } from "../types/home-page-types";
import {
  addLoyaltyPointsByAmountPaid,
  getUserById,
  removeLoyaltyPointsByAmountRefunded,
} from "@/api-calls/users-api-calls";
import { fetchPreferenceTagById } from "@/api-calls/preference-tags-api-calls";
import { updateBookingRequest } from "@/api-calls/booking-api-calls";
import { toast } from "@/hooks/use-toast";
import { RatingFormDialog } from "./RatingFormDialog";
import { formatDate, formatTime } from "../utils/filter-lists/overview-card";

interface ActivityDetailsProps {
  activity: TActivity;
  initialBooking: TPopulatedBooking | null;
  userId: string;
}

const ActivityDetailsPage: React.FC<ActivityDetailsProps> = ({
  activity,
  initialBooking,
  userId,
}) => {
  const [rating, setRating] = React.useState(0);
  const [ownerName, setOwnerName] = React.useState("");
  const [preferenceTagNames, setPreferenceTagNames] = React.useState<string[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const [booking, setBooking] = React.useState<TPopulatedBooking | null>(initialBooking);

  const ratingFormRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    setRating(calculateAverageRating(activity.ratings));
  }, [activity.ratings]);

  React.useEffect(() => {
    getUserById(activity.owner).then((user) => {
      setOwnerName(user.firstName + " " + user.lastName);
    });
  }, [activity.owner]);

  React.useEffect(() => {
    for (let i = 0; i < activity.preferenceTags.length; i++) {
      fetchPreferenceTagById(activity.preferenceTags[i]._id).then((tag) => {
        setPreferenceTagNames((prev) => [...prev, (tag as { _id: string; name: string }).name]);
      });
    }
  }, [activity.preferenceTags]);

  React.useEffect(() => {
    getUserById(userId).then((user) => {
      // check if user is not approved or is under 18 years old
      if (
        user.approved === false ||
        (user.dob && user.dob > new Date(new Date().setFullYear(new Date().getFullYear() - 18)))
      ) {
        setIsButtonDisabled(true);
      }
    });
  }, []);

  const handleButtonClick = () => {
    if (booking?.status === "cancelled") {
      if (booking?._id) {
        updateBookingRequest(booking._id, { status: "upcoming", selectedDate: selectedDate ? new Date(selectedDate) : undefined });
        addLoyaltyPointsByAmountPaid(userId, booking.selectedPrice);
        setBooking({ ...booking, status: "upcoming", selectedDate: selectedDate ? new Date(selectedDate) : new Date() });
      }
    } else if (booking?.status === "completed") {
      // redirect to review page
      ratingFormRef.current?.click();
    } else {
      // cancel activity if there is still 48 hours left
      if (booking?._id && booking.selectedDate) {
        const currentDate = new Date();
        const selectedDate = new Date(booking.selectedDate);
        const difference = Math.abs(selectedDate.getTime() - currentDate.getTime());
        const hours = difference / (1000 * 60 * 60);
        if (hours > 48) {
          updateBookingRequest(booking._id, { status: "cancelled" });
          removeLoyaltyPointsByAmountRefunded(userId, booking.selectedPrice);
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
  const {
    name,
    images,
    description,
    location,
    date,
    price: priceMap,
    ratings,
    specialDiscount,
  } = activity;

  const activityDate = new Date(date);
  const formattedDate = formatDate(activityDate);
  const formattedTime = formatTime(activityDate);

  const cardButtonText =
    booking?.status === "cancelled"
      ? "Book Activity"
      : booking?.status === "completed"
        ? "Review Activity"
        : "Cancel Activity";

  const cardDropdownOptions =
    booking?.status === "cancelled"
      ? [{ value: date.toString(), label: formattedDate + " " + formattedTime }]
      : undefined;

  const price = priceMap ? (Object.values(priceMap)[0] as number) : 0;
  return (
    <div>
      <RatingFormDialog buttonRef={ratingFormRef} onSubmit={() => {}} />
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
                <SharePopover link="https://rahhal.com" />
              </div>
              <div className="flex text-[0.5rem] p-0 mt-2.5">Share</div>
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
            originalPrice={price}
            buttonText={cardButtonText}
            buttonColor={booking?.status === "upcoming" ? "red" : "gold"}
            date={
              booking?.status === "upcoming" || booking?.status === "completed"
                ? formattedDate
                : undefined
            }
            time={
              booking?.status === "upcoming" || booking?.status === "completed"
                ? formattedTime
                : undefined
            }
            dropdownOptions={cardDropdownOptions}
            dateOptions={booking?.status === "cancelled"}
            disabled={isButtonDisabled}
            onButtonClick={handleButtonClick}
            discountedPrice={
              specialDiscount != 0 ? price - (price * specialDiscount) / 100 : undefined
            }
            onDateChange={(selectedDate) => setSelectedDate(selectedDate)}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailsPage;
