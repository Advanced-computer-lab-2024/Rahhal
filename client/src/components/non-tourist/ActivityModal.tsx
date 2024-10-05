import { GenericModal } from "../GenericModal";
import { Activity } from "../../table-columns/advertiser-columns";
import { ToggleableSwitchCard } from "../ToggleableSwitchCard";
import { DoorOpen } from "lucide-react";
import { useState } from "react";
import PictureCard from "../PictureCard";

interface ActivitiesModalProps {
  activityData: Activity;
  dialogTrigger: React.ReactNode;
}

export function ActivitiesModal({ activityData, dialogTrigger }: ActivitiesModalProps) {
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(activityData.isBookingOpen);

  // create generic modal with components based on data type of columns
  return (
    <GenericModal
      title={activityData.name}
      description="Activity Details"
      dialogTrigger={dialogTrigger}
    >
      <div>Name: {activityData.name}</div>
      <div>Date: {new Date(activityData.date).toDateString()}</div>
      <div>Time: {new Date(activityData.time).toTimeString()}</div>
      <div>
        Location: {activityData.location.longitude}, {activityData.location.latitude}
      </div>
      <div>
        Price:{" "}
        {typeof activityData.price === "number"
          ? activityData.price
          : `${activityData.price.min} - ${activityData.price.max}`}
      </div>
      <div>Category: {activityData.category}</div>
      <div>Tags: {activityData.tags}</div>
      <div>Special Discounts: {activityData.specialDiscounts}</div>
      <div>
        <ToggleableSwitchCard
          title="Is Booking Open"
          description="Check if booking is open"
          icon={<DoorOpen />}
          switchState={isBookingOpen}
          onToggle={() => setIsBookingOpen(!isBookingOpen)}
        />
      </div>
      <div>Preference Tags: {activityData.preferenceTags}</div>
      <div>Ratings: {activityData.ratings}</div>

      <PictureCard title={""} description={""} imageSources={["", "", ""]} />
    </GenericModal>
  );
}
