import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import { activitiesColumns, TActivity } from "@/features/admin/utils/columns-definitions/activities-columns";
import { fetchActivities } from "@/api-calls/activities-api-calls";

function AdminActivitiesView() {
  const [activities, setActivities] = useState<TActivity[]>([]);
  
  useEffect(() => {
    const init = async () => {
      const data = await fetchActivities();
      setActivities(data);
    };
    init();
  }, []);

  return (
    <div className="container m-auto">
      <DataTable
        data={activities}
        columns={activitiesColumns}
      />
    </div>
  );
}

export default AdminActivitiesView;