import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import { activitiesColumns, TActivity } from "@/features/advertiser/utils/advertiser-columns";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { ActivitiesModal } from "./ActivityModal";
import { useParams } from "react-router-dom";
import { fetchUserActivities } from "@/api-calls/activities-api-calls";
import { TUser } from "@/types/user";
import { getUserById } from "@/api-calls/users-api-calls";

function AdvertiserView() {
  const [activities, setActivities] = useState<TActivity[]>([]);
  const { id } = useParams();
  const [user, setUser] = useState<TUser>();

  useEffect(() => {
    const init = async () => {
      if (id) {
        const data = await fetchUserActivities(id);
        const userDate = await getUserById(id);
        setUser(userDate);
        setActivities(data);

        // convert string dates fetched from the db to Date objects
        data.forEach((activity: TActivity) => {
          activity.time = new Date(activity.time);
          activity.date = new Date(activity.date);
        });
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
              username={user?.companyName}
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
