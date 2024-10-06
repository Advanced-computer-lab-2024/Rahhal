import { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import { activitiesColumns, TActivity } from "@/table-columns/advertiser-columns";
import { fetchActivities } from "@/api-calls/activities-api-calls";
import DataTableAddButton from "../DataTableAddButton";
import { ActivitiesModal } from "./ActivityModal";

function AdvertiserView() {
  const [activities, setActivities] = useState<TActivity[]>([]);

  useEffect(() => {
    fetchActivities().then((data) => setActivities(data));
  }, []);

  return (
    <>
      <DataTable
        data={activities}
        columns={activitiesColumns}
        newRowModal={
          <ActivitiesModal activityData={undefined} dialogTrigger={<DataTableAddButton />} />
        }
      />
    </>
  );
}

export default AdvertiserView;
