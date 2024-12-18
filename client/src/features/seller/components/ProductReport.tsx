import { useEffect, useState } from "react";
import GenericSalesReport, {
  ReportFilters,
  SalesItem,
} from "../../../components/GenericSalesReport";

import { TOrder } from "@/types/shared";
import { fetchAllOrders, fetchOrdersByDateRange } from "@/api-calls/order-api-calls";
import { fetchProducts } from "@/api-calls/products-api-calls";
import { TProduct } from "../utils/seller-columns";
import useUserStore from "@/stores/user-state-store";

export default function ProductReport() {
  const [salesData, setSalesData] = useState<SalesItem[]>([]);
  const [filters, setFilters] = useState<ReportFilters | null>(null);
  const [orderedProducts, setOrderedProducts] = useState<SalesItem[]>([]);

  const { id } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      // fetch orders
      let salesItems: SalesItem[] = [];
      if (!filters) {
        await fetchAllOrders().then((value) => {
          const orders = value as TOrder[];

          salesItems = orders.map((order) =>
            order.items
              .filter((item) => item.productId && item.seller === id)
              .map((item) => ({
                id: item.productId,
                name: item.name,
                type: "gift_shop",
                price: item.price,
                date: new Date(order.createdAt).toISOString(),
                quantity: item.quantity,
                status: order.orderStatus,
              })),
          );
          setOrderedProducts(salesItems);
        });
      } else {
        const startDate = filters.dateRange[0];
        const endDate = filters.dateRange[1];

        await fetchOrdersByDateRange(startDate, endDate).then((value) => {
          const orders = value as TOrder[];

          salesItems = orders.flatMap((order) =>
            order.items
              .filter((item) => item.seller === id)
              .map((item) => ({
                id: item.productId,
                name: item.name,
                type: "gift_shop",
                price: item.price,
                date: new Date(order.createdAt).toISOString(),
                quantity: item.quantity,
                status: order.orderStatus,
              })),
          );
          setOrderedProducts(salesItems);
        });
      }

      // fetch rest of products that are not in orders
      await fetchProducts().then((value) => {
        const products = value as TProduct[];
        const productsNotInOrders: SalesItem[] = products
          .filter(
            (product) =>
              !orderedProducts.find((item) => item.id === product._id) && product.seller === id,
          )
          .map((product) => ({
            id: product._id,
            name: product.name,
            type: "gift_shop",
            price: product.price,
            date: new Date().toISOString(),
            quantity: 0,
            status: "not_sold",
          }));

        setSalesData([...productsNotInOrders, ...salesItems]);
      });
    };

    fetchData();
  }, [filters]);

  return (
    <GenericSalesReport
      data={salesData}
      type="gift_shop"
      onFilterChange={(filters: ReportFilters) => setFilters(filters)}
    />
  );
}
