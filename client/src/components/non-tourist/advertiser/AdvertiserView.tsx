import { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import { activitiesColumns, TActivity } from "@/table-columns/advertiser-columns";
import { fetchActivities } from "@/api-calls/activities-api-calls";
import DataTableAddButton from "../DataTableAddButton";
import { ActivitiesModal } from "./ActivityModal";

function AdvertiserView() {
  const [activities, setActivities] = useState<TActivity[]>([]);

  useEffect(() => {
    const init = async () => {
      const data = await fetchActivities();

      // convert string dates fetched from the db to Date objects
      data.forEach((activity: TActivity) => {
        activity.time = new Date(activity.time);
        activity.date = new Date(activity.date);
      });
      setActivities(data);
    };
    init();
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
