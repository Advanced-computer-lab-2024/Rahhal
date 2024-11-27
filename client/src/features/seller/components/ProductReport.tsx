import { useEffect, useState } from "react";
import GenericSalesReport, { ReportFilters, SalesItem } from "../../../components/GenericSalesReport";
import { useParams } from "react-router-dom";
import { TOrder } from "@/types/shared";
import { fetchProductOrders } from "@/api-calls/order-api-calls";

export default function ProductReport() {
  const [salesData, setSalesData] = useState<SalesItem[]>([]);

  const { id: productId } = useParams<{ id: string }>();
  
  
  useEffect(() => {

    
    
    // fetch orders for this product
    if (!productId) return;
    fetchProductOrders(productId).then((value) => {
      const orders = value as TOrder[];
      
      const salesItems: SalesItem[] = orders.map(order => ({
        id: order._id,
        name: order.items[0].name,
        type: 'gift_shop',
        price: order.totalPrice,
        date: order.createdAt.toISOString(),
        quantity: order.totalQuantity,
        status: order.orderStatus
      }));
      setSalesData(salesItems);
      
    });

  }, []);

  return (
    <GenericSalesReport
      data={salesData}
      type="gift_shop"
      onFilterChange={(filters: ReportFilters) => console.log("Filters changed:", filters)}
    />
  );
}
