import { useEffect, useState } from "react";
import GenericSalesReport, {
  ReportFilters,
  SalesItem,
} from "../../../components/GenericSalesReport";
import { useParams } from "react-router-dom";
import { TOrder } from "@/types/shared";
import { fetchOrdersByDateRange, fetchProductOrders } from "@/api-calls/order-api-calls";

export default function ProductReport() {
  const [salesData, setSalesData] = useState<SalesItem[]>([]);

  const [filters, setFilters] = useState<ReportFilters | null>(null);

  const { id: productId } = useParams<{ id: string }>();

  useEffect(() => {
    // fetch orders for this product
    if (!productId) return;
    if (!filters) {
      fetchProductOrders(productId).then((value) => {
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
        setSalesData(salesItems);
      });
    } else {
      const startDate = filters.dateRange[0];
      const endDate = filters.dateRange[1];
      

      fetchOrdersByDateRange(startDate, endDate).then((value) => {
        const orders = value as TOrder[];
        console.log("Orders", orders);

        const salesItems: SalesItem[] = orders.map((order) => ({
          id: order._id,
          name: order.items[0].name,
          type: "gift_shop",
          price: order.totalPrice,
          date: new Date(order.createdAt).toISOString(),
          quantity: order.totalQuantity,
          status: order.orderStatus,
        }));
        setSalesData(salesItems);
      });
    }
  }, [productId, filters]);

  return (
    <GenericSalesReport
      data={salesData}
      type="gift_shop"
      onFilterChange={(filters: ReportFilters) => setFilters(filters)}
    />
  );
}
