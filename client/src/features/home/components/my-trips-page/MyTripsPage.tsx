import { useNavigate } from "react-router-dom";
import PageStyles from "@/features/home/styles/MyTripsPage.module.css";
import { MyTripsCard } from "./MyTripsCard";
import { fetchUserBookings } from "@/api-calls/booking-api-calls";
import { useQuery } from "@tanstack/react-query";
import { TPopulatedBooking } from "@/features/home/types/home-page-types";
import { bookingType } from "@/utils/enums";
import { toast } from "@/hooks/use-toast";
import luggage from "@/assets/luggage.svg";
import EmptyStatePlaceholder from "../EmptyStatePlaceholder";
import { AiOutlineThunderbolt } from "react-icons/ai";
import useUserStore from "@/stores/user-state-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MdLocalHotel, MdOutlineEmojiTransportation } from "react-icons/md";
import { useEffect, useState } from "react";

const transferOptions = [
  {
    type: "experiences",
    label: "Experiences",
    icon: <AiOutlineThunderbolt className="mr-2" size={20} />,
    dropdownItems: [
      { label: "Activity", value: "activity" },
      { label: "Itinerary", value: "itinerary" },
    ],
  },
  {
    type: "stays",
    label: "Stays",
    icon: <MdLocalHotel className="mr-2" size={20} />,
    dropdownItems: [{ label: "Hotel", value: "hotel" }],
  },
  {
    type: "travel",
    label: "Travel",
    icon: <MdOutlineEmojiTransportation className="mr-2" size={20} />,
    dropdownItems: [
      { label: "Flight", value: "flight" },
      { label: "Taxi", value: "transportation" },
      { label: "Bus", value: "bus" },
    ],
  },
];

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

  const { id: userId} = useUserStore();

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
    return navigate(`/my-trips-details`, { state: { booking } });
  };

  const [selectedMainFilter, setSelectedMainFilter] = useState("experiences");
  const [selectedSubFilter, setSelectedSubFilter] = useState("activity");
  const [filteredBookings, setFilteredBookings] = useState<TPopulatedBooking[]>(booking as TPopulatedBooking[]);

  useEffect(() => {
    
    // update the main filter when the sub filter changes
    const selectedOption = transferOptions.find((option) =>
      option.dropdownItems.some((item) => item.value === selectedSubFilter),
    );
    if (selectedOption) setSelectedMainFilter(selectedOption.type);

    if (!booking) return;
    // filter bookings based on the selected sub filter
    setFilteredBookings(
      (booking as TPopulatedBooking[]).filter((booking) => booking.type === selectedSubFilter),
    );



  }, [selectedSubFilter, booking]);

  return (
    <div className="mb-5">
      <div className={PageStyles["trip-page-header"]}>
        <p>Trips & Booking</p>
        <div className="flex justify-end px-16 py-[1%] space-x-2">
        {transferOptions.map((option) => (
          <DropdownMenu key={option.type}>
            <DropdownMenuTrigger asChild>
              <Button
                className={`rounded-full bg-transparent text-black hover:bg-gray-200 px-6 py-3 text-md ${selectedMainFilter === option.type ? "bg-gray-200" : ""}`}
                
              >
                {option.icon}
                {option.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {option.dropdownItems.map((item) => (
                <DropdownMenuItem key={item.value} onClick={() => setSelectedSubFilter(item.value)}>
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>
      </div>
      
      <div className={PageStyles["trip-list"]}>
        {filteredBookings && filteredBookings.length > 0
          ? filteredBookings.map(
              (booking: TPopulatedBooking) =>
                booking.type === selectedSubFilter && (
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
                ),
            )
          : !isLoading &&
            !isError && (
              <EmptyStatePlaceholder
                img={luggage}
                img_alt="No trips"
                textOne="No bookings yet—let's change that"
                textTwo="Book things before you go, and get right to the good stuff when you're there."
                buttonText="Start Planning"
                navigateTo={`/entertainment`}
              />
            )}
      </div>
    </div>
  );
};