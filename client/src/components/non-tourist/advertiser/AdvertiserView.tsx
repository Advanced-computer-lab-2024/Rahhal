import { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import { activitiesColumns, TActivity } from "@/table-columns/advertiser-columns";
import DataTableAddButton from "../DataTableAddButton";
import { ActivitiesModal } from "./ActivityModal";
import { useParams } from "react-router-dom";
import { fetchUserActivities } from "@/api-calls/activities-api-calls";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

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
    <div className=" w-full h-4 flex justify-end">
        <div className="flex justify-end relative z-10 pr-3  h-16 pt-2 items-center">
                    <Link to={`/user-settings/${id}`}>
                        <Avatar className="h-10 w-10">
                            <AvatarFallback>SE</AvatarFallback>
                        </Avatar>
                    </Link>
            </div>
        </div>
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
