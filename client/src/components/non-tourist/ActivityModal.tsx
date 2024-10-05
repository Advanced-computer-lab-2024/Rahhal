import { GenericModal } from "../GenericModal";
import { Activity } from "../../table-columns/advertiser-columns";
import { ToggleableSwitchCard } from "../ToggleableSwitchCard";
import { DoorOpen } from "lucide-react";
import { useState } from "react";
import PictureCard from "../PictureCard";
import { Input } from "../ui/input";
import { ENTERTAINMENT_SERVICE_URL } from "./ActivitiesTable";
import axios from "axios";

interface ActivitiesModalProps {
  activityData?: Activity;
  dialogTrigger?: React.ReactNode;
}

export function ActivitiesModal({ activityData, dialogTrigger }: ActivitiesModalProps) {
  const isNewActivity: boolean = activityData === undefined;

  const [name, setName] = useState<string>(activityData?.name ?? "");
  const [date, setDate] = useState<Date>(activityData?.date ?? new Date());
  const [time, setTime] = useState<Date>(activityData?.time ?? new Date());
  const [price, setPrice] = useState<number>(
    typeof activityData?.price === "number" ? activityData.price : 0
  );
  const [category, setCategory] = useState<string>(activityData?.category ?? "");
  const [tags] = useState<string[]>(activityData?.tags ?? []);
  const [specialDiscounts] = useState<string[]>(
    activityData?.specialDiscounts ?? [],
  );
  const [preferenceTags] = useState<string[]>(
    activityData?.preferenceTags ?? [],
  );
  const [ratings] = useState<string[]>(activityData?.ratings?.map(String) ?? []);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(activityData?.isBookingOpen ?? false);

  // save the activity to the server

  const saveActivity = async () => {
    const activity: Activity = {
      name,
      date,
      time,
      price,
      category,
      tags,
      specialDiscounts,
      preferenceTags,
      ratings,
      isBookingOpen,
    };

    

    if (isNewActivity) {
      await axios.post(ENTERTAINMENT_SERVICE_URL, activity);
    } else {
      if (activityData) {
        await axios.put(`${ENTERTAINMENT_SERVICE_URL}/${activityData.id}`, activity);
      }
    }
  };

  // create generic modal with components based on data type of columns
  return (
    <GenericModal
      title={activityData?.name ?? "New Activity"}
      description="Activity Details"
      dialogTrigger={dialogTrigger}
      onSubmit={saveActivity}
    >
      <div>
        Name: <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        Date: <Input value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        Time: <Input value={time} onChange={(e) => setTime(e.target.value)} />
      </div>
      <div>
        {/* Location: {activityData.location.longitude}, {activityData.location.latitude} */}
      </div>
      <div>
        Price:{" "}
        {typeof activityData?.price === "number" ? (
          <Input value={price} onChange={(e) => setPrice(e.target.value)} />
        ) : (
          activityData?.price.map((price) => `${price.type}: ${price.price}`).join(", ")
        )}
      </div>
      <div>
        Category: <Input value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>
      <div>Tags: {activityData?.tags.join(", ") ?? ""}</div>
      <div>Special Discounts: {activityData?.specialDiscounts.join(", ") ?? ""}</div>
      <div>
        <ToggleableSwitchCard
          title="Is Booking Open"
          description="Check if booking is open"
          icon={<DoorOpen />}
          switchState={isBookingOpen}
          onToggle={() => setIsBookingOpen(!isBookingOpen)}
        />
      </div>
      <div>Preference Tags: {activityData?.preferenceTags.join(", ") ?? ""}</div>
      <div>Ratings: {activityData?.ratings.join(", ") ?? ""}</div>

      <PictureCard title={"Photo Tour"} description={"Uploaded Photos"} imageSources={[]} />
    </GenericModal>
  );
}
