import { useEffect, useState } from "react";
import GenericSalesReport, {
  ReportFilters,
  SalesItem,
} from "../../../components/GenericSalesReport";

import { TPopulatedBooking } from "@/features/home/types/home-page-types";
import { fetchBookingsByDateRange, getBookingsWithFilters } from "@/api-calls/booking-api-calls";
import { fetchActivities } from "@/api-calls/activities-api-calls";
import { TActivity } from "../utils/advertiser-columns";
import useUserStore from "@/stores/user-state-store";

export default function ActivityReport() {
  const [salesData, setSalesData] = useState<SalesItem[]>([]);
  const [filters, setFilters] = useState<ReportFilters | null>(null);
  const [bookedActivities, setBookedActivities] = useState<SalesItem[]>([]);

  const { id } = useUserStore();

  useEffect(() => {
    const apiFilters = {
      type: "activity",
      status: "completed",
    };

    const fetchData = async () => {
      let salesItems: SalesItem[] = [];
      if (!filters) {
        await getBookingsWithFilters(apiFilters).then((value) => {
          const bookings = value as TPopulatedBooking[];
          salesItems = bookings
            .filter((booking) => booking._id && booking.entity.owner === id)
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
          setBookedActivities(salesItems);
        });
      } else {
        const startDate = filters.dateRange[0];
        const endDate = filters.dateRange[1];

        await fetchBookingsByDateRange(startDate, endDate, apiFilters).then((value) => {
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
          setBookedActivities(salesItems);
        });
      }

      // add activities without bookings
      await fetchActivities().then((value) => {
        const activities = value as TActivity[];

        const activitiesNotInBookings: SalesItem[] = activities
          .filter(
            (activity) =>
              !bookedActivities.find((item) => item.id === activity._id) && activity.owner === id,
          )
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

        setSalesData([...activitiesNotInBookings, ...salesItems]);
      });
    };
    fetchData();
  }, [filters]);

  return (
    <GenericSalesReport
      data={salesData}
      type="activity"
      onFilterChange={(filters: ReportFilters) => setFilters(filters)}
    />
  );
}
