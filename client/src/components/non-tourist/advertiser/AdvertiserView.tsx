import { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import { activitiesColumns, TActivity } from "@/table-columns/advertiser-columns";
import DataTableAddButton from "../DataTableAddButton";
import { ActivitiesModal } from "./ActivityModal";
import { useParams } from "react-router-dom";
import { fetchUserActivities } from "@/api-calls/activities-api-calls";

function AdvertiserView() {
  const [activities, setActivities] = useState<TActivity[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const init = async () => {
      if (id) {
        console.log(id);
        const data = await fetchUserActivities(id);
        console.log(data);

        // convert string dates fetched from the db to Date objects
        data.forEach((activity: TActivity) => {
          activity.time = new Date(activity.time);
          activity.date = new Date(activity.date);
        });
        setActivities(data);
      }
    };
    init();
  }, []);

  return (
    <>
      {id ? (
        <DataTable
          data={activities}
          columns={activitiesColumns}
          newRowModal={
            <ActivitiesModal
              userId={id}
              activityData={undefined}
              dialogTrigger={<DataTableAddButton />}
            />
          }
        />
      ) : (
        <p>Resource not found</p>
      )}
    </>
  );
}

export default AdvertiserView;
