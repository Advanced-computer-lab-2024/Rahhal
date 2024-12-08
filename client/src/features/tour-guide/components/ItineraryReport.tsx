import { useEffect, useState } from "react";
import GenericSalesReport, {
  ReportFilters,
  SalesItem,
} from "../../../components/GenericSalesReport";
import { fetchBookingsByDateRange, getBookingsWithFilters } from "@/api-calls/booking-api-calls";
import { TPopulatedBooking } from "@/features/home/types/home-page-types";
import { fetchItineraries } from "@/api-calls/itineraries-api-calls";
import { TItinerary } from "@/features/admin/utils/columns-definitions/itineraries-columns";
import useUserStore from "@/stores/user-state-store";

export default function ItineraryReport() {
  const [salesData, setSalesData] = useState<SalesItem[]>([]);
  const [filters, setFilters] = useState<ReportFilters | null>(null);
  const { id } = useUserStore();

  useEffect(() => {
    const apiFilters = {
      type: "itinerary",
      status: "completed",
      owner: id,
    };

    let salesItems: SalesItem[] = [];

    if (!filters) {
      getBookingsWithFilters(apiFilters).then((value) => {
        const bookings = value as TPopulatedBooking[];

        salesItems = bookings
          .filter((booking) => booking._id && booking.entity.owner === id)
          .map((booking) => ({
            id: booking.entity._id!,
            name: booking.entity.name,
            type: "itinerary",
            price: booking.selectedPrice,
            date: new Date(booking.selectedDate).toISOString(),
            quantity: 1,
            status: booking.status,
            tourists: 1,
          }));
      });
    } else {
      const startDate = filters.dateRange[0];
      const endDate = filters.dateRange[1];

      fetchBookingsByDateRange(startDate, endDate, apiFilters).then((value) => {
        const bookings = value as TPopulatedBooking[];

        salesItems = bookings
          .filter((booking) => booking._id)
          .map((booking) => ({
            id: booking.entity._id!,
            name: booking.entity.name,
            type: "itinerary",
            price: booking.selectedPrice,
            date: new Date(booking.selectedDate).toISOString(),
            quantity: 1,
            status: booking.status,
            tourists: 1,
          }));
      });
    }

    // get rest of itineraries that are not in bookings
    fetchItineraries().then((value) => {
      const itineraries = value as TItinerary[];

      const itinerariesNotInBookings: SalesItem[] = itineraries
        .filter((itinerary) => (!salesData.find((item) => item.id === itinerary._id)) && itinerary.owner === id)``
        .map((itinerary) => ({
          id: itinerary._id,
          name: itinerary.name,
          type: "itinerary",
          price: itinerary.price,
          date: new Date().toISOString(),
          quantity: 0,
          status: "not_sold",
          tourists: 0,
        }));

      setSalesData([...salesData, ...itinerariesNotInBookings, ...salesItems]);
    });
  }, [filters]);

  return (
    <GenericSalesReport
      data={salesData}
      type="itinerary"
      onFilterChange={(filters: ReportFilters) => setFilters(filters)}
    />
  );
}
