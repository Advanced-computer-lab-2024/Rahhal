import { useNavigate, useParams } from "react-router-dom";
import PageStyles from "@/features/home/styles/MyTripsPage.module.css";
import { MyTripsCard } from "./MyTripsCard";
import { fetchUserBookings } from "@/api-calls/booking-api-calls";
import { useQuery } from "@tanstack/react-query";
import { TPopulatedBooking } from "@/features/home/types/home-page-types";
import { bookingType } from "@/utils/enums";
import { toast } from "@/hooks/use-toast";
import luggage from "@/assets/luggage.svg";
import { FaArrowRightLong } from "react-icons/fa6";

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

  function isDateInPast(date: string | Date, status: string): boolean {
    if (!date) return false;

    const dateTimestamp = new Date(date).getTime();
    const currentTimestamp = Date.now();

    return dateTimestamp < currentTimestamp && status === "upcoming";
  }

  const { id: userId } = useParams<{ id: string }>();

  const {
    data: booking,
    isLoading,
    isError,
  } = useQuery<TPopulatedBooking[]>({
    queryKey: ["userBooking", userId],
    queryFn: () => fetchUserBookings(userId as string),
    enabled: !!userId,
  });

  const navigate = useNavigate();

  const handleClick = (booking: TPopulatedBooking) => {
    if (
      booking.type === bookingType.Hotel ||
      booking.type === bookingType.Flight ||
      booking.type === bookingType.Transportation
    ) {
      toast({
        title: "This feature is not available yet",
        description:
          "For now, you can't view details of flights, hotels nor transportation bookings. Stay tuned!",
      });
      return;
    }
    if (
      !isDateInPast(
        booking.selectedDate ? booking.selectedDate : booking.selectedDate,
        booking.status,
      )
    ) {
      return navigate(
        `/my-trips-details?userId=${userId}&eventId=${booking.entity._id}&bookingId=${booking._id}&type=${booking.type}`,
      );
    } else {
      return navigate(
        `/my-trips-details?userId=${userId}&eventId=${booking.entity._id}&bookingId=${booking._id}&type=${booking.type}`,
      );
    }
  };

  return (
    <div className="mb-5">
      <div className={PageStyles["trip-page-header"]}>
        <p>Trips & Booking</p>
      </div>
      <div className={PageStyles["trip-list"]}>
        {booking && booking.length > 0
          ? booking.map((booking: TPopulatedBooking) => (
              <MyTripsCard
                key={booking.entity._id}
                title={booking.entity.name || `${booking.type}`}
                price={booking.selectedPrice}
                status={
                  isDateInPast(
                    booking.selectedDate ? booking.selectedDate : booking.selectedDate,
                    booking.status,
                  )
                    ? "completed"
                    : booking.status
                }
                date={formatDate(
                  booking.selectedDate ? booking.selectedDate : booking.selectedDate,
                )}
                image={booking.entity.images ? booking.entity.images[0] : undefined}
                onClick={() => handleClick(booking)}
              />
            ))
          : !isLoading &&
            !isError && (
              <div className={PageStyles["no-trips"]}>
                <img src={luggage} alt="No trips" />
                <br />
                <h1>No bookings yet—let's change that</h1>
                <br />
                <p>Book things before you go, and get right to the good stuff when you're there.</p>
                <br />
                <button onClick={() => navigate(`/entertainment/${userId}`)}>
                  <div>Start Planning</div>
                  <div>
                    <FaArrowRightLong size={19} />
                  </div>
                </button>
              </div>
            )}
      </div>
    </div>
  );
};
