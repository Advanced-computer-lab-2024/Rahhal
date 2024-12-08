import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import { activitiesColumns, TActivity } from "@/features/admin/utils/columns-definitions/activities-columns";
import { fetchActivities } from "@/api-calls/activities-api-calls";
import { cn } from "@/lib/utils";

function AdminActivitiesView() {
  const [activities, setActivities] = useState<TActivity[]>([]);
  
  useEffect(() => {
    const init = async () => {
      const data = await fetchActivities();
      setActivities(data);
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


  return (
    <div className="container m-auto">
      <h1 className={cn(
      "text-3xl font-bold tracking-tight",
      "bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
    )}>
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