import { useEffect, useState } from "react";
import GenericSalesReport, {
  ReportFilters,
  SalesItem,
} from "../../../components/GenericSalesReport";

import { TPopulatedBooking } from "@/features/home/types/home-page-types";
import { fetchBookingsByDateRange, getBookingsWithFilters } from "@/api-calls/booking-api-calls";

export default function ActivityReport() {
  const [salesData, setSalesData] = useState<SalesItem[]>([]);
  const [filters, setFilters] = useState<ReportFilters | null>(null);

  useEffect(() => {
    const apiFilters = {
      type: "activity",
      status: "completed",
    };

    if (!filters) {
      getBookingsWithFilters(apiFilters).then((value) => {
        const bookings = value as TPopulatedBooking[];

        const salesItems: SalesItem[] = bookings
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
        setSalesData(salesItems);
      });
    } else {
      const startDate = filters.dateRange[0];
      const endDate = filters.dateRange[1];

      fetchBookingsByDateRange(startDate, endDate, apiFilters).then((value) => {
        const bookings = value as TPopulatedBooking[];

        const salesItems: SalesItem[] = bookings
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
        setSalesData(salesItems);
      });
    }
  }, [filters]);

  return (
    <GenericSalesReport
      data={salesData}
      type="activity"
      onFilterChange={(filters: ReportFilters) => setFilters(filters)}
    />
  );
}
