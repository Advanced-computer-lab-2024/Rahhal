import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import {
  activitiesColumns,
  TActivity,
} from "@/features/admin/utils/columns-definitions/activities-columns";
import { fetchActivities } from "@/api-calls/activities-api-calls";
import { cn } from "@/lib/utils";

function AdminActivitiesView() {
  const [activities, setActivities] = useState<TActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const data = await fetchActivities();
      setActivities(data);
      setLoading(false);
    };
    init();
  }, []);

  const handleActivityUpdate = (activity: TActivity) => {
    const newActivities = activities.map((oldActivity) => {
      if (oldActivity._id === activity._id) {
        return activity;
      }
      return oldActivity;
    });
    setActivities(newActivities);
  };

  if (loading) return <div className="w-full text-center py-8">Loading...</div>;
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1
        className={cn(
          "text-2xl sm:text-3xl font-bold tracking-tight mb-6",
          "bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
        )}
      >
        Activities
      </h1>
      <DataTable
        data={activities}
        columns={activitiesColumns(handleActivityUpdate)}
      />
    </div>
  );
}

export default AdminActivitiesView;
