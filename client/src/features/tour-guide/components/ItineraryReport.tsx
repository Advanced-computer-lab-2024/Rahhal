import { useEffect, useState } from "react";
import GenericSalesReport, {
  ReportFilters,
  SalesItem,
} from "../../../components/GenericSalesReport";
import { useParams } from "react-router-dom";

import { getBookingsWithFilters } from "@/api-calls/booking-api-calls";
import { TPopulatedBooking } from "@/features/home/types/home-page-types";

export default function ItineraryReport() {
  const [salesData, setSalesData] = useState<SalesItem[]>([]);

  const { id: itineraryId } = useParams<{ id: string }>();

  useEffect(() => {
    if (!itineraryId) return;
    const filters = {
      entity: itineraryId,
      type: "itinerary",
      status: "completed",
    };

    getBookingsWithFilters(filters).then((value) => {
      const bookings = value as TPopulatedBooking[];

      const salesItems: SalesItem[] = bookings
        .filter((booking) => booking._id)
        .map((booking) => ({
          id: booking._id!,
          name: booking.entity.name,
          type: "itinerary",
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
      type="itinerary"
      onFilterChange={(filters: ReportFilters) => console.log("Filters changed:", filters)}
    />
  );
}
