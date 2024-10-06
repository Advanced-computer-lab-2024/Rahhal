import { GenericModal } from "../GenericModal";
import { TActivity, TCategory, TRating, TPrice } from "../../table-columns/advertiser-columns";
import { ToggleableSwitchCard } from "../ToggleableSwitchCard";
import { DoorOpen } from "lucide-react";
import { useEffect, useState } from "react";
import PictureCard from "../PictureCard";
import { ENTERTAINMENT_SERVICE_URL } from "./ActivitiesTable";
import axios from "axios";
import ShortText from "../ShortText";
import PriceCategories from "../price-categories/PriceCategories";
import TagsSelector from "./TagsSelector";
import { GenericSelect } from "../GenericSelect";
import ReviewDisplay from "./Ratings";
import { TimePicker } from "../ui/TimePicker";
import { TimePicker12H } from "../time-picker/time-picker-12hour";
import { DateTimePickerForm } from "../time-picker/date-time-picker-form";


interface ActivitiesModalProps {
  activityData?: TActivity;
  dialogTrigger?: React.ReactNode;
}

const fetchCategories = async () => {
  const response = await axios.get(ENTERTAINMENT_SERVICE_URL + "/categories");
  return response.data;
};

const fetchPreferenceTags = async () => {
  const response = await axios.get(ENTERTAINMENT_SERVICE_URL + "/preference-tags");
  return response.data;
};

const IMAGES = [
  "src/assets/farmhouse-main.jpeg",
  "src/assets/farmhouse-zoom.jpeg",
  "src/assets/farmhouse-room.jpeg",
];

const sampleReviews = [
  { user: "John Doe", rating: 4, review: "Great product, highly recommend!" },
  { user: "Jane Smith", rating: 5, review: "Exceeded my expectations." },
  { user: "Bob Johnson", rating: 3 }
];

export function ActivitiesModal({ activityData, dialogTrigger }: ActivitiesModalProps) {
  const isNewActivity: boolean = activityData === undefined;

  const [name, setName] = useState<string>(activityData?.name ?? "");
  const [date, setDate] = useState<Date>(activityData?.date ?? new Date());
  const [time, setTime] = useState<Date>(activityData?.time ?? new Date());
  const [price, setPrice] = useState<TPrice>(() => activityData?.price ?? { price: [] });
  const [category, setCategory] = useState<string>(activityData?.category ?? "");
  const [allCategories, setAllCategories] = useState<TCategory[]>([]);
  const [tags, setTags] = useState<string[]>(activityData?.tags ?? []);
  const [specialDiscounts] = useState<string[]>(activityData?.specialDiscounts ?? []);
  const [preferenceTags, setPreferenceTags] = useState<string[]>(
    activityData?.preferenceTags ?? [],
  );

  const [ratings] = useState<TRating[]>(activityData?.ratings ?? []);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(activityData?.isBookingOpen ?? false);

  useEffect(() => {
    fetchCategories().then((data) => setAllCategories(data));
    fetchPreferenceTags().then((data) => {
      setPreferenceTags(data);
      setTags(data);
    });
  }, []);

  // save the activity to the server

  const saveActivity = async () => {
    
    const activity: TActivity = {
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
      location: {
        longitude: 0,
        latitude: 0
      }
    };

    
    if (isNewActivity) {
      await axios.post(ENTERTAINMENT_SERVICE_URL + "/activities", activity).then((response) => {
        console.log(response.data);
      });
    } else {
      if (activityData) {
        await axios.put(`${ENTERTAINMENT_SERVICE_URL}/activities/${activityData.id}`, activity);
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
      <ShortText
        title="Name"
        initialValue={name}
        onSave={(value) => setName(value)}
        placeholder={""}
        initialDisabled={!isNewActivity}
      />
      <DateTimePickerForm />

      <TimePicker12H date={time} setDate={(value) => setTime(value)} />

      <div>
        {/* Location: {activityData.location.longitude}, {activityData.location.latitude} */}
      </div>
      <div>
        {typeof activityData?.price === "number" ? (
          <ShortText
            title="Price"
            initialValue={activityData.price.toString()}
            onSave={(value) => setPrice({ price: parseFloat(value) })}
            placeholder={""}
            initialDisabled={!isNewActivity}
          />
        ) : (
          <PriceCategories
            title="Prices"
            priceCategories={Array.isArray(activityData?.price) ? activityData.price : []}
            onPriceCategoriesChange={(value) => setPrice({ price: value })}
          />
        )}
      </div>
      <div className="m-5 mx-6">
        <GenericSelect
          label="Category"
          placeholder="Select a category"
          options={allCategories.map((category) => ({
            label: category.name,
            value: category.name,
          }))}
          onSelect={(value) => setCategory(value)}
        />
      </div>
      <div className="m-5 mx-6">
        <TagsSelector
          placeholder={"Select tags"}
          options={tags.map((tag) => ({ label: tag, value: tag }))}
          onSave={(value) => setTags(value.map((option) => option.value))}
        />
      </div>
      <ShortText
        title="Special Discounts"
        initialValue={specialDiscounts.join(", ")}
        onSave={(value) => {}}
        placeholder={""}
        initialDisabled={!isNewActivity}
      />
      <div>
        <ToggleableSwitchCard
          title="Is Booking Open"
          description="Check if booking is open"
          icon={<DoorOpen />}
          switchState={isBookingOpen}
          onToggle={() => setIsBookingOpen(!isBookingOpen)}
        />
      </div>
      <div className="m-5 mx-6">
        <TagsSelector
          placeholder={"Select preference tags"}
          options={preferenceTags.map((tag) => ({ label: tag, value: tag }))}
          onSave={(value) => setPreferenceTags(value.map((option) => option.value))}
        />
      </div>
      

      <PictureCard title={"Photo Tour"} description={"Uploaded Photos"} imageSources={IMAGES} />
      <div className="m-5 mx-6"><ReviewDisplay reviews={sampleReviews} /></div>
    </GenericModal>
  );
}
