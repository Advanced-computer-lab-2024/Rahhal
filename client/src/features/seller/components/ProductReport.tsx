import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DateRangePicker } from '@/components/date-picker/date-range-picker';
import StatCard from './StatCard';
import BarChartCard from '@/features/charts/BarChartCard';
import LineChartCard from '@/features/charts/LineChartCard';

interface ProductOrder {
  date: Date;
  quantity: number;
  revenue: number;
  orderStatus: 'pending' | 'completed' | 'cancelled' | 'shipped';
}

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
  const [productOrders, setProductOrders] = useState<ProductOrder[]>([]);
  const [stats, setStats] = useState<ProductStats>({
    totalRevenue: 0,
    totalQuantitySold: 0,
    averagePrice: 0,
    pendingOrders: 0,
    cancelledOrders: 0,
    completedOrders: 0,
    shippedOrders: 0
  });
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7),
    new Date()
    ]);

  // Generate mock data for a single product
  const generateMockData = (startDate?: Date, endDate?: Date) => {
    
    const orders: ProductOrder[] = [];
    const today = new Date();
    
    // Generate 30 days of data
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Generate 0-5 orders for each day
      const dailyOrderCount = Math.floor(Math.random() * 6);
      
      for (let j = 0; j < dailyOrderCount; j++) {
        const quantity = Math.floor(Math.random() * 3) + 1;
        const price = 599.99;
        orders.push({
          date: date,
          quantity: quantity,
          revenue: quantity * price,
          orderStatus: ['pending', 'completed', 'cancelled', 'shipped'][Math.floor(Math.random() * 4)] as any
        });
      }
    }


    return orders;
  };

  useEffect(() => {
    
    const startDate = dateRange[0];
    const endDate = dateRange[1];
    const mockOrders = generateMockData(startDate, endDate);
    setProductOrders(mockOrders);

    // Calculate stats
    const stats = mockOrders.reduce((acc, order) => ({
      totalRevenue: acc.totalRevenue + order.revenue,
      totalQuantitySold: acc.totalQuantitySold + order.quantity,
      pendingOrders: acc.pendingOrders + (order.orderStatus === 'pending' ? 1 : 0),
      cancelledOrders: acc.cancelledOrders + (order.orderStatus === 'cancelled' ? 1 : 0),
      completedOrders: acc.completedOrders + (order.orderStatus === 'completed' ? 1 : 0),
      shippedOrders: acc.shippedOrders + (order.orderStatus === 'shipped' ? 1 : 0),
      averagePrice: 0
    }), {
      totalRevenue: 0,
      totalQuantitySold: 0,
      pendingOrders: 0,
      cancelledOrders: 0,
      completedOrders: 0,
      shippedOrders: 0,
      averagePrice: 0
    });

    stats.averagePrice = stats.totalRevenue / stats.totalQuantitySold;
    setStats(stats);

    // Aggregate daily data for charts
    const dailyMap = new Map<string, DailyData>();
    mockOrders.forEach(order => {
      const dateStr = order.date.toISOString().split('T')[0];
      const existing = dailyMap.get(dateStr) || { 
        date: dateStr, 
        revenue: 0, 
        quantity: 0,
        averagePrice: 0
      };
      
      existing.revenue += order.revenue;
      existing.quantity += order.quantity;
      existing.averagePrice = existing.revenue / existing.quantity;
      
      dailyMap.set(dateStr, existing);
    });

    const sortedDailyData = Array.from(dailyMap.values())
      .sort((a, b) => a.date.localeCompare(b.date));
    
    setDailyData(sortedDailyData);
  }, [dateRange]);

  const handleDateRangeChange = (range: [Date | null, Date | null]) => {
    setDateRange([range[0] ?? new Date(), range[1] ?? new Date()]);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Smartphone</h1>
        <p className="text-gray-600 mb-4">Product ID: PRD-001</p>

        {/* Date Range Picker */}
        <div className="mb-4">
          <DateRangePicker  initialDateFrom={dateRange[0]}  initialDateTo={dateRange[1]} onUpdate={ (range) => handleDateRangeChange([range.range.from, range.range.to ?? new Date()]) } />
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Revenue" value={"$" + stats.totalRevenue.toFixed(2)} />
          <StatCard title="Total Quantity Sold" value={stats.totalQuantitySold.toString()} />
          <StatCard title="Average Price" value={"$" + stats.averagePrice.toFixed(2)} />
          <StatCard title="Pending Orders" value={stats.pendingOrders.toString()} />
        </div>

        {/* Revenue Trend Line Chart */}
        <LineChartCard title="Revenue Trend" data={dailyData} dataKey="date" lineDataKey="revenue" lineDataName="Revenue" />

        {/* Sales Quantity Bar Chart */}
        <BarChartCard title="Daily Sales Quantity" data={dailyData} dataKey="date" />

        {/* Order Status Distribution */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Order Status Distribution</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-500">{stats.pendingOrders}</div>
              <div className="text-gray-500">Pending</div>
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
};

export default ProductReport;