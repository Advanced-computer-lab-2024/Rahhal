

type StatCardProps = {
    title: string;
    value: string;
};

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default StatCard;