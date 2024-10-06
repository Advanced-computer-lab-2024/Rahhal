import { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { activitiesColumns, TActivity } from "../../table-columns/advertiser-columns";
import axios from "axios";

import DataTableAddButton from "./DataTableAddButton";
import { ActivitiesModal } from "./ActivityModal";

export const ENTERTAINMENT_SERVICE_URL = "http://localhost:3003";

// fetch data from the server
export const fetchActivities = async () => {
  const response = await axios.get(ENTERTAINMENT_SERVICE_URL + "/activities");
  return response.data;
};

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
