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
import { fetchProducts } from "@/api-calls/products-api-calls";
import { TProduct } from "@/features/seller/utils/seller-columns";

export default function AdminReport() {
  const [salesData, setSalesData] = useState<SalesItem[]>([]);
  const [filters, setFilters] = useState<ReportFilters | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const admins = (await getAdmins()) as TUser[];
      const adminIds = admins.map((admin) => admin._id);

      const itineraryFilters = { type: "itinerary", status: "completed" };
      const activityFilters = { type: "activity", status: "completed" };

      const [bookingsResult, activitiesResult, ordersResult, productsResult] = await Promise.all([
        filters
          ? fetchBookingsByDateRange(filters.dateRange[0], filters.dateRange[1], itineraryFilters)
          : getBookingsWithFilters(itineraryFilters),
        filters
          ? fetchBookingsByDateRange(filters.dateRange[0], filters.dateRange[1], activityFilters)
          : getBookingsWithFilters(activityFilters),
        filters
          ? fetchOrdersByDateRange(filters.dateRange[0], filters.dateRange[1])
          : fetchAllOrders(),
        fetchProducts(),
      ]);

      const bookings = bookingsResult as TPopulatedBooking[];
      const activities = activitiesResult as TPopulatedBooking[];
      const orders = ordersResult as TOrder[];
      const products = productsResult as TProduct[];

      const salesItems: SalesItem[] = [
        ...bookings.map((booking) => ({
          id: booking.entity._id!,
          name: booking.entity.name,
          type: "itinerary",
          price: booking.selectedPrice * 0.1,
          date: new Date(booking.selectedDate).toISOString(),
          quantity: 1,
          status: booking.status,
          tourists: 1,
        })),
        ...activities.map((booking) => ({
          id: booking.entity._id!,
          name: booking.entity.name,
          type: "activity",
          price: booking.selectedPrice * 0.1,
          date: new Date(booking.selectedDate).toISOString(),
          quantity: 1,
          status: booking.status,
          tourists: 1,
        })),
        ...orders.flatMap(
          (order) =>
            order.items.map((product) => ({
              id: product.productId,
              name: product.name,
              type: "gift_shop",
              price: adminIds.includes(product.seller) ? product.price : product.price * 0.1,
              date: order.createdAt,
              quantity: product.quantity,
              status: order.orderStatus,
              tourists: 0,
            })),

          // fetch rest of products that are not in orders
          ...products
            .filter((product) => !salesData.find((item) => item.id === product._id))
            .map((product) => ({
              id: product._id,
              name: product.name,
              type: "gift_shop",
              price: product.price,
              date: new Date().toISOString(),
              quantity: 0,
              status: "not_sold",
              tourists: 0,
            })),
        ),
      ];

      setSalesData(salesItems);
    };

    fetchData();
  }, [filters]);

  return (
    <GenericSalesReport
      data={salesData}
      type="all"
      onFilterChange={(filters: ReportFilters) => setFilters(filters)}
    />
  );
}
