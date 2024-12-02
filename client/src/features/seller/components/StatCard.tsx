import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { months } from "@/features/seller/utils/months";
import { useState } from "react";

type StatCardProps = {
  title: string;
  value: string;
  haveSelect?: boolean;
  onSelectedMonthChange?: (month: string) => void;
};

function StatCard({ title, value, haveSelect = false, onSelectedMonthChange }: StatCardProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>(months[0]);
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-gray-500 text-sm">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>

        {haveSelect && (
          <Select
            value={selectedMonth}
            onValueChange={(value) => {
              setSelectedMonth(value);
              onSelectedMonthChange?.(value);
            }}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select item" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem key={index} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}

export default StatCard;
