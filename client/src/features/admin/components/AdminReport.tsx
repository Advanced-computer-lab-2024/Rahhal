import { useEffect, useState } from "react";
import GenericSalesReport, {
  ReportFilters,
  SalesItem,
} from "../../../components/GenericSalesReport";
import { useParams } from "react-router-dom";

import { getBookingsWithFilters } from "@/api-calls/booking-api-calls";
import { TBookingType, TOrder, TPopulatedBooking } from "@/features/home/types/home-page-types";
import { fetchAllOrders } from "@/api-calls/order-api-calls";

export default function AdminReport() {
  const [salesData, setSalesData] = useState<SalesItem[]>([]);

  useEffect(() => {
    // fetch itineraries
    const itineraryFilters = {
      type: "itinerary",
      status: "completed",
    };

    getBookingsWithFilters(itineraryFilters).then((value) => {
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

    // fetch activities
    const activityFilters = {
      type: "activity",
      status: "completed",
    };

    getBookingsWithFilters(activityFilters).then((value) => {
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
      setSalesData((prev) => [...prev, ...salesItems]);
    });

    // fetch orders for gift shop
    fetchAllOrders().then((value) => {
      const orders = value as TOrder[];

      const salesItems: SalesItem[] = orders.map((order) => ({
        id: order._id,
        name: order.items[0].name,
        type: "gift_shop",
        price: order.totalPrice,
        date: new Date(order.createdAt).toISOString(),
        quantity: order.totalQuantity,
        status: order.orderStatus,
      }));
      setSalesData((prev) => [...prev, ...salesItems]);
    });
  }, []);

  return (
    <GenericSalesReport
      data={salesData}
      type="all"
      onFilterChange={(filters: ReportFilters) => console.log("Filters changed:", filters)}
    />
  );
}
