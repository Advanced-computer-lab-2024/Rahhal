import { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { activitiesColumns, Activity } from "../../table-columns/advertiser-columns";

const ENTERTAINMENT_SERVICE_URL = "http://localhost:3003/activities";

// fetch data from the server
export const fetchActivities = async () => {
  const response = await fetch(ENTERTAINMENT_SERVICE_URL);
  return response.json();
};

function AdvertiserView() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetchActivities().then((data) => setActivities(data));
  }, []);

  return (
    <>
      <DataTable data={activities} columns={activitiesColumns} />
    </>
  );
}

export default AdvertiserView;
