import { months } from "@/features/seller/utils/months";

export function dateRangeCalculator(month: string, year: number): [Date, Date] {
  const monthIndex = months.indexOf(month);
  const startDate = new Date(year, monthIndex, 2);
  const lastDay = new Date(year, monthIndex + 1, 0).getDate();
  const endDate = new Date(year, monthIndex, lastDay);
  endDate.setHours(23, 59, 59, 999);
  return [startDate, endDate];
}
