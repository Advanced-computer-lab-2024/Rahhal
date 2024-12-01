import { useEffect, useState } from "react";
import GenericSalesReport, {
  ReportFilters,
  SalesItem,
} from "../../../components/GenericSalesReport";

import { fetchBookingsByDateRange, getBookingsWithFilters } from "@/api-calls/booking-api-calls";
import { TOrder, TPopulatedBooking } from "@/features/home/types/home-page-types";
import { fetchAllOrders, fetchOrdersByDateRange } from "@/api-calls/order-api-calls";
import { getAdmins } from "@/api-calls/users-api-calls";
import { TUser } from "@/types/user";

export default function AdminReport() {
  const [salesData, setSalesData] = useState<SalesItem[]>([]);
  const [filters, setFilters] = useState<ReportFilters | null>(null);
  const [adminIds, setAdminIds] = useState<string[]>([]);

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
            price: booking.selectedPrice * 0.1,
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
          price: booking.selectedPrice * 0.1,
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

        // for each product in order, create a sales item
        const salesItems: SalesItem[] = orders
          .map((order) =>
            order.items.map((product) => ({
              id: product.productId,
              name: product.name,
              type: "gift_shop",
              price: adminIds.includes(product.seller) ? product.price : product.price * 0.1,
              date: order.createdAt,
              quantity: product.quantity,
              status: order.orderStatus,
              tourists: 1,
            })),
          )
          .flat();

        setSalesData((prev) => [...prev, ...salesItems]);
      });
    } else {
      const startDate = filters.dateRange[0];
      const endDate = filters.dateRange[1];

      fetchOrdersByDateRange(startDate, endDate).then((value) => {
        const orders = value as TOrder[];

        // for each product in order, create a sales item
        const salesItems: SalesItem[] = orders
          .map((order) =>
            order.items.map((product) => ({
              id: product.productId,
              name: product.name,
              type: "gift_shop",
              price: adminIds.includes(product.seller) ? product.price : product.price * 0.1,
              date: order.createdAt,
              quantity: product.quantity,
              status: order.orderStatus,
              tourists: 1,
            })),
          )
          .flat();

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
            price: booking.selectedPrice * 0.1,
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
            price: booking.selectedPrice * 0.1,
            date: new Date(booking.selectedDate).toISOString(),
            quantity: 1,
            status: booking.status,
            tourists: 1,
          }));
        setSalesData((prev) => [...prev, ...salesItems]);
      });
    }
  }, [filters]);

  useEffect(() => {
    // fetch all admins
    getAdmins().then((value) => {
      const admins = value as TUser[];
      setAdminIds(admins.map((admin) => admin._id));
    });
  }, []);

  return (
    <GenericSalesReport
      data={salesData}
      type="all"
      onFilterChange={(filters: ReportFilters) => setFilters(filters)}
    />
  );
}
