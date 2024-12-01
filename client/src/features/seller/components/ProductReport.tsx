import { useEffect, useState } from "react";
import GenericSalesReport, {
  ReportFilters,
  SalesItem,
} from "../../../components/GenericSalesReport";

import { TOrder } from "@/types/shared";
import { fetchAllOrders, fetchOrdersByDateRange } from "@/api-calls/order-api-calls";
import { fetchProducts } from "@/api-calls/products-api-calls";

export default function ProductReport() {
  const [salesData, setSalesData] = useState<SalesItem[]>([]);

  const [filters, setFilters] = useState<ReportFilters | null>(null);

  

  useEffect(() => {
    // fetch orders
    if (!filters) {
      fetchAllOrders().then((value) => {
        const orders = value as TOrder[];

        const salesItems: SalesItem[] = orders.map((order) => ({
          id: order.items[0].productId,
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
        

        const salesItems: SalesItem[] = orders.map((order) => ({
          id: order.items[0].productId,
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

    // fetch rest of products that are not in orders
    fetchProducts().then((value) => {
      const products = value as any[];
      const productsNotInOrders:SalesItem[] = products
        .filter((product) => !salesData.find((item) => item.id === product._id))
        .map((product) => ({
          id: product._id,
          name: product.name,
          type: "gift_shop",
          price: product.price,
          date: new Date(product.createdAt).toISOString(),
          quantity: 0,
          status: "not_sold",
        }));
      setSalesData([...salesData, ...productsNotInOrders]);
    });

  }, [filters]);

  return (
    <GenericSalesReport
      data={salesData}
      type="gift_shop"
      onFilterChange={(filters: ReportFilters) => setFilters(filters)}
    />
  );
}
