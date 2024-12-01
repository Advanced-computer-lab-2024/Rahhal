import React, { useState, useEffect } from "react";
import { DateRangePicker } from "@/components/date-picker/date-range-picker";
import StatCard from "../features/seller/components/StatCard";
import BarChartCard from "@/features/charts/BarChartCard";
import LineChartCard from "@/features/charts/LineChartCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderStatus } from "@/utils/enums";
import { TBookingStatus } from "@/features/home/types/home-page-types";

export interface SalesItem {
  id: string;
  name: string;
  type: "event" | "itinerary" | "activity" | "gift_shop";
  price: number;
  quantity: number;
  date: string;
  status: OrderStatus | TBookingStatus | string;
  tourists?: number; // Optional: for events/itineraries
}

interface ReportStats {
  totalRevenue: number;
  totalQuantity: number;
  averagePrice: number;
  totalTourists: number;
  pendingCount: number;
  cancelledCount: number;
  completedCount: number;
}

interface DailyData {
  date: string;
  revenue: number;
  quantity: number;
  tourists: number;
  averagePrice: number;
}

interface SalesReportProps {
  data: SalesItem[];
  type?: "event" | "itinerary" | "activity" | "gift_shop" | "all";
  onFilterChange?: (filters: ReportFilters) => void;
}

export interface ReportFilters {
  dateRange: [Date, Date];
  itemType: string;
  itemId: string | null;
}

const GenericSalesReport: React.FC<SalesReportProps> = ({ data, type = "all", onFilterChange }) => {
  const [filteredData, setFilteredData] = useState<SalesItem[]>([]);
  const [stats, setStats] = useState<ReportStats>({
    totalRevenue: 0,
    totalQuantity: 0,
    averagePrice: 0,
    totalTourists: 0,
    pendingCount: 0,
    cancelledCount: 0,
    completedCount: 0,
  });
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [filters, setFilters] = useState<ReportFilters>({
    dateRange: [
      new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 30),
      new Date(),
    ],
    itemType: type === "all" ? "all" : type,
    itemId: null,
  });

  // Get unique items for the filter dropdown
  // Get unique items for the filter dropdown
  const items = Array.from(new Set(data.map((item) => item.id)))
    .map((id) => data.find((item) => item.id === id))
    .filter(
      (item): item is NonNullable<typeof item> =>
        item !== undefined && (filters.itemType === "all" || item.type === filters.itemType),
    )
    .map((item) => ({
      id: item.id,
      name: item.name,
      type: item.type,
    }));

  console.log(items);

  useEffect(() => {
    // Apply filters
    let filtered = data;

    // Filter by date range
    filtered = filtered.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= filters.dateRange[0] && itemDate <= filters.dateRange[1];
    });

    // Filter by type
    if (filters.itemType !== "all") {
      filtered = filtered.filter((item) => item.type === filters.itemType);
    }

    // Filter by specific item
    if (filters.itemId) {
      filtered = filtered.filter((item) => item.id === filters.itemId);
    }

    setFilteredData(filtered);

    // Calculate stats
    const newStats = filtered.reduce(
      (acc, item) => ({
        totalRevenue: acc.totalRevenue + item.price * item.quantity,
        totalQuantity: acc.totalQuantity + item.quantity,
        totalTourists: acc.totalTourists + (item.tourists || 0),
        pendingCount: acc.pendingCount + (item.status === OrderStatus.processing ? 1 : 0),
        cancelledCount: acc.cancelledCount + (item.status === OrderStatus.cancelled ? 1 : 0),
        completedCount: acc.completedCount + (item.status === OrderStatus.delivered ? 1 : 0),
        averagePrice: 0,
      }),
      {
        totalRevenue: 0,
        totalQuantity: 0,
        totalTourists: 0,
        pendingCount: 0,
        cancelledCount: 0,
        completedCount: 0,
        averagePrice: 0,
      },
    );

    newStats.averagePrice = newStats.totalRevenue / newStats.totalQuantity || 0;
    setStats(newStats);

    // Aggregate daily data
    const dailyMap = new Map<string, DailyData>();
    filtered.forEach((item) => {
      const dateStr = new Date(item.date).toISOString().split("T")[0];
      const existing = dailyMap.get(dateStr) || {
        date: dateStr,
        revenue: 0,
        quantity: 0,
        tourists: 0,
        averagePrice: 0,
      };

      existing.revenue += item.price * item.quantity;
      existing.quantity += item.quantity;
      existing.tourists += item.tourists || 0;
      existing.averagePrice = existing.revenue / existing.quantity;

      dailyMap.set(dateStr, existing);
    });

    setDailyData(Array.from(dailyMap.values()).sort((a, b) => a.date.localeCompare(b.date)));

    // Notify parent of filter changes if callback provided
    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [filters, data]);

  const handleDateRangeChange = (range: [Date | null, Date | null]) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: [range[0] ?? new Date(), range[1] ?? new Date()],
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Sales Report</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <DateRangePicker
            initialDateFrom={filters.dateRange[0]}
            initialDateTo={filters.dateRange[1]}
            onUpdate={(range) =>
              handleDateRangeChange([range.range.from, range.range.to ?? new Date()])
            }
          />

          {type === "all" && (
            <Select
              value={filters.itemType}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, itemType: value, itemId: null }))
              }
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="itinerary">Itineraries</SelectItem>
                <SelectItem value="activity">Activities</SelectItem>
                <SelectItem value="gift_shop">Gift Shop</SelectItem>
              </SelectContent>
            </Select>
          )}

          <Select
            value={filters.itemId ?? "all"}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, itemId: value === "all" ? null : value }))
            }
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select item" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              {items.map((item, index) => (
                <SelectItem key={index} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Revenue" value={`$${stats.totalRevenue.toFixed(2)}`} />
          <StatCard title="Total Sales" value={stats.totalQuantity.toString()} />
          <StatCard title="Average Price" value={`$${stats.averagePrice.toFixed(2)}`} />
          {(type === "event" || type === "itinerary" || type === "activity" || type === "all") && (
            <StatCard title="Total Tourists" value={stats.totalTourists.toString()} />
          )}
        </div>

        {/* Charts */}
        <div className="space-y-6">
          <LineChartCard
            title="Revenue Trend"
            data={dailyData}
            dataKey="date"
            lineDataKey="revenue"
            lineDataName="Revenue"
          />

          <BarChartCard
            title={type === "gift_shop" ? "Daily Sales Quantity" : "Daily Tourist Count"}
            data={dailyData}
            dataKey="date"
            // barDataKey={type === "gift_shop" ? "quantity" : "tourists"}
          />

          {/* Status Distribution */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Status Distribution</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-500">{stats.pendingCount}</div>
                <div className="text-gray-500">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-500">{stats.completedCount}</div>
                <div className="text-gray-500">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-500">{stats.cancelledCount}</div>
                <div className="text-gray-500">Cancelled</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericSalesReport;
