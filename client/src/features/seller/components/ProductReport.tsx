import React, { useState, useEffect } from "react";
import { DateRangePicker } from "@/components/date-picker/date-range-picker";
import StatCard from "./StatCard";
import BarChartCard from "@/features/charts/BarChartCard";
import LineChartCard from "@/features/charts/LineChartCard";
import { TOrder } from "@/types/shared";
import { useParams } from "react-router-dom";
import { fetchProductOrders } from "@/api-calls/order-api-calls";

interface ProductStats {
  totalRevenue: number;
  totalQuantitySold: number;
  averagePrice: number;
  pendingOrders: number;
  cancelledOrders: number;
  completedOrders: number;
  shippedOrders: number;
}

interface DailyData {
  date: string;
  revenue: number;
  quantity: number;
  averagePrice: number;
}

function ProductReport() {
  const { id: productId } = useParams<{ id: string }>();

  const [productOrders, setProductOrders] = useState<TOrder[]>([]);
  const [productName, setProductName] = useState<string>("Product Name");
  const [stats, setStats] = useState<ProductStats>({
    totalRevenue: 0,
    totalQuantitySold: 0,
    averagePrice: 0,
    pendingOrders: 0,
    cancelledOrders: 0,
    completedOrders: 0,
    shippedOrders: 0,
  });
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7),
    new Date(),
  ]);

  useEffect(() => {
    // Fetch product orders
    if (!productId) return;
    fetchProductOrders(productId).then((data) => {
      const orders = data as TOrder[];
      
      setProductOrders(orders);

      // search for the product name
      if (orders.length > 0) {
        const productName = orders[0].items.find((item) => item.productId === productId)?.name;
        setProductName(productName || "Product Name");
      }
      
    }
    );
  }, []);

  useEffect(() => {
    const startDate = dateRange[0];
    const endDate = dateRange[1];

    // filter orders by date range
    const filteredOrders = productOrders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startDate && orderDate <= endDate;
    });

    // Calculate stats
    const stats = filteredOrders.reduce(
      (acc, order) => ({
        totalRevenue: acc.totalRevenue + order.totalPrice, // TODO: Revenue calculation here is incorrect
        totalQuantitySold: acc.totalQuantitySold + order.totalQuantity,
        pendingOrders: acc.pendingOrders + (order.orderStatus === "processing" ? 1 : 0),
        cancelledOrders: acc.cancelledOrders + (order.orderStatus === "cancelled" ? 1 : 0),
        completedOrders: acc.completedOrders + (order.orderStatus === "received" ? 1 : 0),
        shippedOrders: acc.shippedOrders + (order.orderStatus === "shipped" ? 1 : 0),
        averagePrice: 0,
      }),
      {
        totalRevenue: 0,
        totalQuantitySold: 0,
        pendingOrders: 0,
        cancelledOrders: 0,
        completedOrders: 0,
        shippedOrders: 0,
        averagePrice: 0,
      },
    );

    stats.averagePrice = stats.totalRevenue / stats.totalQuantitySold;
    setStats(stats);

    // Aggregate daily data for charts
    const dailyMap = new Map<string, DailyData>();
    filteredOrders.forEach((order) => {
      const dateStr = new Date(order.createdAt).toISOString().split("T")[0];
      const existing = dailyMap.get(dateStr) || {
        date: dateStr,
        revenue: 0,
        quantity: 0,
        averagePrice: 0,
      };

      existing.revenue += order.totalPrice;
      existing.quantity += order.totalQuantity;
      existing.averagePrice = existing.revenue / existing.quantity;

      dailyMap.set(dateStr, existing);
    });

    const sortedDailyData = Array.from(dailyMap.values()).sort((a, b) =>
      a.date.localeCompare(b.date),
    );

    setDailyData(sortedDailyData);
  }, [dateRange, productOrders]);

  const handleDateRangeChange = (range: [Date | null, Date | null]) => {
    setDateRange([range[0] ?? new Date(), range[1] ?? new Date()]);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{productName}</h1>
        <p className="text-gray-600 mb-4">Product ID: {productId}</p>

        {/* Date Range Picker */}
        <div className="mb-4">
          <DateRangePicker
            initialDateFrom={dateRange[0]}
            initialDateTo={dateRange[1]}
            onUpdate={(range) =>
              handleDateRangeChange([range.range.from, range.range.to ?? new Date()])
            }
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Revenue" value={"$" + stats.totalRevenue.toFixed(2)} />
          <StatCard title="Total Quantity Sold" value={stats.totalQuantitySold.toString()} />
          <StatCard title="Average Price" value={"$" + stats.averagePrice.toFixed(2)} />
          <StatCard title="Pending Orders" value={stats.pendingOrders.toString()} />
        </div>

        {/* Revenue Trend Line Chart */}
        <LineChartCard
          title="Revenue Trend"
          data={dailyData}
          dataKey="date"
          lineDataKey="revenue"
          lineDataName="Revenue"
        />

        {/* Sales Quantity Bar Chart */}
        <BarChartCard title="Daily Sales Quantity" data={dailyData} dataKey="date" />

        {/* Order Status Distribution */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Order Status Distribution</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-500">{stats.pendingOrders}</div>
              <div className="text-gray-500">Processing</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-500">{stats.completedOrders}</div>
              <div className="text-gray-500">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-500">{stats.shippedOrders}</div>
              <div className="text-gray-500">Shipped</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-red-500">{stats.cancelledOrders}</div>
              <div className="text-gray-500">Cancelled</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductReport;
