import { BarChart, Bar, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type BarChartCardProps = {
    title: string;
    data: any[];
    dataKey: string;
    height?: number;
    

};


function BarChartCard({ title, data, dataKey, height = 300 }: BarChartCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data} >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={dataKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#82ca9d" name="Units Sold" />
            </BarChart>
          </ResponsiveContainer>
        </div>
  );
}

export default BarChartCard;