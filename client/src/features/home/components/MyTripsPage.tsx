import { useNavigate, useParams } from "react-router-dom";
import PageStyles from "../styles/MyTripsPage.module.css";
import { MyTripsCard } from "./MyTripsCard";
import { fetchLocationDetails } from "@/api-calls/google-maps-location-api-call";
import { fetchUserBookings } from "@/api-calls/booking-api-calls";
import { useQuery } from "@tanstack/react-query";
import { TBookingType, TPopulatedBooking } from "@/features/home/types/home-page-types";
import { useEffect } from "react";
export const MyTripsPage = () => {
  function formatDate(dateString: string | Date): string {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return `${formattedDate} at ${formattedTime}`;
  }

  function isDateInPast(date: string | Date): boolean {
    if (!date) return false;

    const dateTimestamp = new Date(date).getTime();
    const currentTimestamp = Date.now();

    return dateTimestamp < currentTimestamp;
  }

  const { id } = useParams<{ id: string }>();

  const {
    data: booking,
    isLoading,
    isError,
  } = useQuery<TPopulatedBooking[]>({
    queryKey: ["userBooking", id],
    queryFn: () => fetchUserBookings(id as string),
    enabled: !!id,
  });

  const navigate = useNavigate();
  const { id: userId } = useParams<{ id: string }>(); // Get the userId from URL params

  const handleClick = (booking: TPopulatedBooking) => {
    if (!isDateInPast(booking.entity.date ? booking.entity.date : booking.selectedDate)) {
      return navigate(
        `/destination-page?userId=${userId}&bookingId=${booking.entity._id}&status=${booking.status}`,
      );
    } else {
      return navigate(
        `/destination-page?userId=${userId}&bookingId=${booking.entity._id}&status=completed`,
      );
    }
  };

  console.log(booking);

  return (
    <>
      <div className={PageStyles["trip-page-header"]}>
        <p>Trips & Booking</p>
      </div>
      <div className={PageStyles["trip-list"]}>
        {booking
          ? booking.map((booking: TPopulatedBooking) => (
              <MyTripsCard
                key={booking.entity._id}
                title={booking.entity.name}
                price={booking.selectedPrice}
                status={
                  isDateInPast(booking.entity.date ? booking.entity.date : booking.selectedDate)
                    ? "completed"
                    : booking.status
                }
                date={formatDate(booking.entity.date ? booking.entity.date : booking.selectedDate)}
                onClick={() => handleClick(booking)}
              />
            ))
          : !isLoading && !isError && <p>No bookings found.</p>}
      </div>
    </>
  );
};
