import { useEffect, useState } from "react";
import GenericSalesReport, {
  ReportFilters,
  SalesItem,
} from "../../../components/GenericSalesReport";
import { useParams } from "react-router-dom";

import { fetchBookingsByDateRange, getBookingsWithFilters } from "@/api-calls/booking-api-calls";
import { TBookingType, TOrder, TPopulatedBooking } from "@/features/home/types/home-page-types";
import { fetchAllOrders, fetchOrdersByDateRange } from "@/api-calls/order-api-calls";

export default function AdminReport() {
  const [salesData, setSalesData] = useState<SalesItem[]>([]);
  const [filters, setFilters] = useState<ReportFilters | null>(null);

  useEffect(() => {
    // fetch itineraries
    const itineraryFilters = {
      type: "itinerary",
      status: "completed",
    };
    const activityFilters = {
      type: "activity",
      status: "completed",
    };
    if (!filters) {
      getBookingsWithFilters(itineraryFilters).then((value) => {
        const bookings = value as TPopulatedBooking[];

        const salesItems: SalesItem[] = bookings
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
        setSalesData(salesItems);
      });

      // fetch activities

      getBookingsWithFilters(activityFilters).then((value) => {
        const bookings = value as TPopulatedBooking[];

        const salesItems: SalesItem[] = bookings.map((booking) => ({
          id: booking.entity._id!,
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

        const salesItems: SalesItem[] = orders
          .filter((order) => order._id)
          .map((order) => ({
            id: order.items[0].productId,
            name: order.items[0].name,
            type: "gift_shop",
            price: order.totalPrice,
            date: new Date(order.createdAt ?? "").toISOString(),
            quantity: order.totalQuantity,
            status: order.orderStatus,
          }));
        setSalesData((prev) => [...prev, ...salesItems]);
      });
    } else {
      const startDate = filters.dateRange[0];
      const endDate = filters.dateRange[1];

      fetchOrdersByDateRange(startDate, endDate).then((value) => {
        const orders = value as TOrder[];

        const salesItems: SalesItem[] = orders
          .filter((order) => order._id)
          .map((order) => ({
          id: order.items[0].productId,
          name: order.items[0].name,
          type: "gift_shop",
          price: order.totalPrice,
          date: new Date(order.createdAt ?? "").toISOString(),
          quantity: order.totalQuantity,
          status: order.orderStatus,
        }));
        setSalesData(salesItems);
      });

      fetchBookingsByDateRange(startDate, endDate, itineraryFilters).then((value) => {
        const bookings = value as TPopulatedBooking[];

        const salesItems: SalesItem[] = bookings
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
        setSalesData((prev) => [...prev, ...salesItems]);
      });

      fetchBookingsByDateRange(startDate, endDate, activityFilters).then((value) => {
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
        setSalesData((prev) => [...prev, ...salesItems]);
      });
    }
  }, [filters]);

  return (
    <GenericSalesReport
      data={salesData}
      type="all"
      onFilterChange={(filters: ReportFilters) => setFilters(filters)}
    />
  );
}
