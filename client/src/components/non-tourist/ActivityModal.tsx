import { GenericModal } from "../GenericModal";
import { Activity } from "../../table-columns/advertiser-columns";
import { ToggleableSwitchCard } from "../ToggleableSwitchCard";
import { DoorOpen } from "lucide-react";
import { useState } from "react";
import PictureCard from "../PictureCard";

interface ActivitiesModalProps {
  activityData?: Activity;
  dialogTrigger?: React.ReactNode;
}

export function ActivitiesModal({ activityData, dialogTrigger }: ActivitiesModalProps) {
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(activityData?.isBookingOpen ?? false);

  // create generic modal with components based on data type of columns
  return (
    <GenericModal
      title={activityData?.name ?? "New Activity"}
      description="Activity Details"
      dialogTrigger={dialogTrigger}
    >
      <div>Name: {activityData?.name ?? ""}</div>
      <div>Date: {new Date(activityData?.date ?? new Date()).toDateString()}</div>
      <div>Time: {new Date(activityData?.time ?? new Date()).toLocaleTimeString()}</div>
      <div>
        {/* Location: {activityData.location.longitude}, {activityData.location.latitude} */}
      </div>
      <div>
        Price:{" "}
        {typeof activityData?.price === "number"
          ? activityData?.price
          : activityData?.price.map((price) => `${price.type}: ${price.price}`).join(", ")}
      </div>
      <div>Category: {activityData?.category ?? ""}</div>
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
