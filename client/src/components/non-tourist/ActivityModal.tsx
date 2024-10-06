import { GenericModal } from "../GenericModal";
import { Activity } from "../../table-columns/advertiser-columns";
import { ToggleableSwitchCard } from "../ToggleableSwitchCard";
import { DoorOpen } from "lucide-react";
import { useState } from "react";
import PictureCard from "../PictureCard";
import { Input } from "../ui/input";
import { ENTERTAINMENT_SERVICE_URL } from "./ActivitiesTable";
import axios from "axios";
import ShortText from "../ShortText";
import PriceCategories from "../price-categories/PriceCategories";

interface ActivitiesModalProps {
  activityData?: Activity;
  dialogTrigger?: React.ReactNode;
}

const IMAGES = [ "src/assets/farmhouse-main.jpeg", "src/assets/farmhouse-zoom.jpeg", "src/assets/farmhouse-room.jpeg" ];

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
      <ShortText title="Name" initialValue={name} onSave={(value) => setName(value)} placeholder={""} initialDisabled={!isNewActivity} />
      <ShortText title="Date" initialValue={date.toString()} onSave={(value) => setDate(new Date(value))} placeholder={""} initialDisabled={!isNewActivity} />
      
      <ShortText title="Time" initialValue={time.toString()} onSave={(value) => setTime(new Date(value))} placeholder={""} initialDisabled={!isNewActivity} />
      <div>
        {/* Location: {activityData.location.longitude}, {activityData.location.latitude} */}
      </div>
      <div>
        
        {typeof activityData?.price === "number" ? (
          <ShortText title="Price" initialValue={activityData.price.toString()} onSave={(value) => setPrice(parseFloat(value))} placeholder={""} initialDisabled={!isNewActivity} />
        ) : (
          <PriceCategories title="Prices" priceCategories={activityData?.price ?? []} onPriceCategoriesChange={() => {}} />
        )}
      </div>
      <ShortText title="Category" initialValue={category} onSave={(value) => setCategory(value)} placeholder={""} initialDisabled={!isNewActivity} />
      
      <ShortText title="Tags" initialValue={tags.join(", ")} onSave={(value) => {}} placeholder={""} initialDisabled={!isNewActivity} />
      <ShortText title="Special Discounts" initialValue={specialDiscounts.join(", ")} onSave={(value) => {}} placeholder={""}  initialDisabled={!isNewActivity} />
      <div>
        <ToggleableSwitchCard
          title="Is Booking Open"
          description="Check if booking is open"
          icon={<DoorOpen />}
          switchState={isBookingOpen}
          onToggle={() => setIsBookingOpen(!isBookingOpen)}
        />
      </div>
      <ShortText title="Preference Tags" initialValue={preferenceTags.join(", ")} onSave={(value) => {}} placeholder={""} initialDisabled={!isNewActivity} />
      <ShortText title="Ratings" initialValue={ratings.join(", ")} onSave={(value) => {}} placeholder={""} initialDisabled={!isNewActivity} />

      <PictureCard title={"Photo Tour"} description={"Uploaded Photos"} imageSources={IMAGES} />
    </GenericModal>
  );
}
