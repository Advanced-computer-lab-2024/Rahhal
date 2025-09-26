import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import {
  activitiesColumns,
  TActivity,
} from "@/features/advertiser/utils/advertiser-columns";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { ActivitiesModal } from "./ActivityModal";
import { useParams } from "react-router-dom";
import {
  fetchUserActivities,
  deleteActivity,
} from "@/api-calls/activities-api-calls";
import { TUser } from "@/types/user";
import { getUserById } from "@/api-calls/users-api-calls";
import { toast } from "@/hooks/use-toast";
import { STATUS_CODES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import useUserStore from "@/stores/user-state-store";

function AdvertiserView() {
  const [activities, setActivities] = useState<TActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useUserStore();
  const [user, setUser] = useState<TUser>();

  useEffect(() => {
    const init = async () => {
      setLoading(true);
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
      setLoading(false);
    };
    init();
  }, []);

  const handleActivityDelete = async (id: string) => {
    try {
      const response = await deleteActivity(id);
      if (response.status === STATUS_CODES.STATUS_OK) {
        toast({
          title: "Success",
          description: "Activity deleted successfully",
          style: {
            backgroundColor: "#34D399",
            color: "white",
          },
        });

        const newActivities = activities.filter(
          (activity) => activity._id !== id
        );
        setActivities(newActivities);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          (error as any).response?.data?.message || "Error deleting activity",
        variant: "destructive",
      });
    }
  };

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
    <div className="w-full max-w-full mx-auto">
      <h1
        className={cn(
          "text-2xl sm:text-3xl font-bold tracking-tight mb-6",
          "bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
        )}
      >
        Activities
      </h1>
      {id ? (
        <div className="w-full overflow-hidden">
          <DataTable
            data={activities}
            columns={activitiesColumns(
              handleActivityDelete,
              handleActivityUpdate
            )}
            newRowModal={
              <ActivitiesModal
                userId={id}
                username={user?.companyName}
                activityData={undefined}
                dialogTrigger={<DataTableAddButton className="bg-[#1d3c51]" />}
                onSubmit={(newActivity) => {
                  setActivities((prev) => [...prev, newActivity]);
                }}
                onDelete={handleActivityDelete}
              />
            }
          />
        </div>
      ) : (
        <p>Resource not found</p>
      )}
    </div>
  );
}

export default AdvertiserView;
