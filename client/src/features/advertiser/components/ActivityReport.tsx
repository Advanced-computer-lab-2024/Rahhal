import { useEffect, useState } from "react";
import GenericSalesReport, {
  ReportFilters,
  SalesItem,
} from "../../../components/GenericSalesReport";
import { useParams } from "react-router-dom";

import { TPopulatedBooking } from "@/features/home/types/home-page-types";
import { getBookingsWithFilters } from "@/api-calls/booking-api-calls";

export default function ActivityReport() {
  const [salesData, setSalesData] = useState<SalesItem[]>([]);

  const { id: activityId } = useParams<{ id: string }>();

  useEffect(() => {
    if (!activityId) return;

    const filters = {
      entity: activityId,
      type: "activity",
      status: "completed",
    };

    getBookingsWithFilters(filters).then((value) => {
      const bookings = value as TPopulatedBooking[];

      const salesItems: SalesItem[] = bookings
        .filter((booking) => booking._id)
        .map((booking) => ({
          id: booking._id!,
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
  }, []);

  return (
    <GenericSalesReport
      data={salesData}
      type="activity"
      onFilterChange={(filters: ReportFilters) => console.log("Filters changed:", filters)}
    />
  );
}
