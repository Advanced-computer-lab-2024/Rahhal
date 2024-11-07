
import { LineChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import { CurveType } from "recharts/types/shape/Curve";

type LineChartCardProps = {
    title: string;
    data: any[];
    dataKey: string; // the key for the data on the x-axis
    height?: number;
    lineColor?: string;
    lineDataKey?: string; // the key for the on hover data
    lineDataName?: string; // the name for the on hover data
    lineType?: CurveType; // the type of line. Can be "monotone" or "linear"
    };



function LineChartCard({ title, data, dataKey, height = 300, lineColor = "#8884d8", lineDataKey = "", lineDataName = "", lineType = "monotone" }: LineChartCardProps) {
  

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-8">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type={lineType} dataKey={lineDataKey} stroke={lineColor} name={lineDataName} />
      </LineChart>
    </ResponsiveContainer>
  </div>
  );
}

export default LineChartCard;