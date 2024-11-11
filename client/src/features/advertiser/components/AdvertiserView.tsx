import { useEffect, useMemo, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import { activitiesColumns, TActivity } from "@/features/advertiser/utils/advertiser-columns";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { ActivitiesModal } from "./ActivityModal";
import { useParams } from "react-router-dom";
import { fetchUserActivities } from "@/api-calls/activities-api-calls";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
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

  const avatarLetters = useMemo(() => {
    return user?.firstName && user?.lastName ? `${user.firstName[0]}${user.lastName[0]}` : "US";
  }, [user]);

  return (
    <>
      <div className="flex justify-end sticky top-0 z-10">
        <Link to={`/user-settings/${id}`}>
          <Avatar className="h-10 w-10 mx-4 mt-4">
            <AvatarImage src={user?.profilePicture}></AvatarImage>
            <AvatarFallback>{avatarLetters}</AvatarFallback>
          </Avatar>
        </Link>
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
