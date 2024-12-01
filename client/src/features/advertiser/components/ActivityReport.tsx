import { useEffect, useState } from "react";
import GenericSalesReport, {
  ReportFilters,
  SalesItem,
} from "../../../components/GenericSalesReport";

import { TPopulatedBooking } from "@/features/home/types/home-page-types";
import { fetchBookingsByDateRange, getBookingsWithFilters } from "@/api-calls/booking-api-calls";
import { fetchActivities } from "@/api-calls/activities-api-calls";
import { TActivity } from "../utils/advertiser-columns";

export default function ActivityReport() {
  const [salesData, setSalesData] = useState<SalesItem[]>([]);
  const [filters, setFilters] = useState<ReportFilters | null>(null);

  useEffect(() => {
    const apiFilters = {
      type: "activity",
      status: "completed",
    };

    let salesItems: SalesItem[] = [];

    if (!filters) {
      getBookingsWithFilters(apiFilters).then((value) => {
        const bookings = value as TPopulatedBooking[];

        salesItems = bookings
          .filter((booking) => booking._id)
          .map((booking) => ({
            id: booking.entity._id!,
            name: booking.entity.name,
            type: "activity",
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
            type: "activity",
            price: booking.selectedPrice,
            date: new Date(booking.selectedDate).toISOString(),
            quantity: 1,
            status: booking.status,
            tourists: 1,
          }));
      });
    }

    // add activities without bookings
    fetchActivities().then((value) => {
      const activities = value as TActivity[];
      
      const activitiesNotInBookings: SalesItem[] = activities
        .filter((activity) => !salesData.find((item) => item.id === activity._id))
        .map((activity) => ({
          id: activity._id,
          name: activity.name,
          type: "activity",
          price: activity.price,
          date: new Date().toISOString(),
          quantity: 0,
          status: "not_sold",
          tourists: 0,
        }));

      

      setSalesData([...salesData, ...activitiesNotInBookings, ...salesItems]);
    });
  }, [filters]);

  return (
    <GenericSalesReport
      data={salesData}
      type="activity"
      onFilterChange={(filters: ReportFilters) => setFilters(filters)}
    />
  );
}
