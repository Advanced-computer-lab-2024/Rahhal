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
import EditableTimePicker from "./EditableTimePicker";
import EditableDatePicker from "./EditableDatePicker";

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

// sample images for the picture card
const IMAGES = [
  "src/assets/farmhouse-main.jpeg",
  "src/assets/farmhouse-zoom.jpeg",
  "src/assets/farmhouse-room.jpeg",
];

// sample reviews for the review display
const sampleReviews = [
  { user: "John Doe", rating: 4, review: "Great product, highly recommend!" },
  { user: "Jane Smith", rating: 5, review: "Exceeded my expectations." },
  { user: "Bob Johnson", rating: 3 },
];

export function ActivitiesModal({ activityData, dialogTrigger }: ActivitiesModalProps) {
  const isNewActivity: boolean = activityData === undefined; // check if the activity is new or existing
  const [modalActivityData, setModalActivitiesData] = useState<TActivity | undefined>(activityData); // current activity data present in the modal

  const [modalDBData, setModalDBData] = useState<{ [key: string]: any }>({
    categories: [],
    preferenceTags: [],
    tags: [],
  }); // holds the data fetched from the server like categories and preference tags, etc.

  // fetch categories and preference tags from the server
  useEffect(() => {
    fetchCategories().then((data) => setModalDBData({ ...modalDBData, categories: data }));

    fetchPreferenceTags().then((data) =>
      setModalDBData({ ...modalDBData, preferenceTags: data, tags: data }),
    );

    if (isNewActivity) {
      setModalActivitiesData({
        name: "",
        date: new Date(),
        time: new Date(),
        location: { longitude: 0, latitude: 0 },
        specialDiscounts: [],
        preferenceTags: [],
        isBookingOpen: false,
        price: 0,
        category: "",
        tags: [],
        ratings: [],
      });
    }
  }, []);

  // save the activity to the server

  const saveActivity = async () => {
    if (isNewActivity) {
      await axios
        .post(ENTERTAINMENT_SERVICE_URL + "/activities", modalActivityData)
        .then((response) => {
          console.log(response.data);
        });
    } else {
      if (activityData) {
        await axios.put(
          `${ENTERTAINMENT_SERVICE_URL}/activities/${activityData.id}`,
          modalActivityData,
        );
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
        initialValue={modalActivityData?.name ?? ""}
        onSave={(value) =>
          setModalActivitiesData(
            modalActivityData ? { ...modalActivityData, name: value } : undefined,
          )
        }
        placeholder={""}
        initialDisabled={!isNewActivity}
      />
      <EditableDatePicker
        date={modalActivityData?.date ?? new Date()}
        onDateChange={(date) =>
          setModalActivitiesData(
            modalActivityData ? { ...modalActivityData, date: date } : undefined,
          )
        }
      />

      <EditableTimePicker
        time={modalActivityData?.time ?? new Date()}
        onTimeChange={(time: Date | undefined) =>
          setModalActivitiesData(
            modalActivityData ? { ...modalActivityData, time: time ?? new Date() } : undefined,
          )
        }
      />

      <div>
        {/* Location: {activityData.location.longitude}, {activityData.location.latitude} */}
      </div>
      <div>
        {typeof activityData?.price === "number" ? (
          <ShortText
            title="Price"
            initialValue={modalActivityData?.price.toString() ?? ""}
            onSave={(value) =>
              setModalActivitiesData(
                modalActivityData ? { ...modalActivityData, price: parseFloat(value) } : undefined,
              )
            }
            placeholder={""}
            initialDisabled={!isNewActivity}
          />
        ) : (
          <PriceCategories
            title="Prices"
            priceCategories={Array.isArray(activityData?.price) ? activityData.price : []}
            onPriceCategoriesChange={(value) =>
              setModalActivitiesData(
                modalActivityData
                  ? {
                      ...modalActivityData,
                      price: value.map((price) => ({ type: price.type, price: price.price })),
                    }
                  : undefined,
              )
            }
          />
        )}
      </div>
      <div className="m-5 mx-6">
        <GenericSelect
          label="Category"
          placeholder="Select a category"
          options={modalDBData.categories.map((category: TCategory) => ({
            label: category.name,
            value: category.name,
          }))}
          onSelect={(value) =>
            setModalActivitiesData(
              modalActivityData ? { ...modalActivityData, category: value } : undefined,
            )
          }
        />
      </div>
      <div className="m-5 mx-6">
        <TagsSelector
          placeholder={"Select tags"}
          options={modalDBData.tags.map((tag: string) => ({ label: tag, value: tag }))}
          onSave={(value) =>
            setModalActivitiesData(
              modalActivityData
                ? { ...modalActivityData, tags: value.map((option) => option.value) }
                : undefined,
            )
          }
        />
      </div>
      <ShortText
        title="Special Discounts"
        initialValue={modalActivityData?.specialDiscounts.join(", ") ?? ""}
        onSave={(value) => {}}
        placeholder={""}
        initialDisabled={!isNewActivity}
      />
      <div>
        <ToggleableSwitchCard
          title="Is Booking Open"
          description="Check if booking is open"
          icon={<DoorOpen />}
          switchState={modalActivityData?.isBookingOpen ?? false}
          onToggle={() =>
            setModalActivitiesData(
              modalActivityData
                ? { ...modalActivityData, isBookingOpen: !modalActivityData.isBookingOpen }
                : undefined,
            )
          }
        />
      </div>
      <div className="m-5 mx-6">
        <TagsSelector
          placeholder={"Select preference tags"}
          options={modalDBData.preferenceTags.map((tag: string) => ({ label: tag, value: tag }))}
          onSave={(value) =>
            setModalActivitiesData(
              modalActivityData
                ? { ...modalActivityData, preferenceTags: value.map((option) => option.value) }
                : undefined,
            )
          }
        />
      </div>

      <PictureCard title={"Photo Tour"} description={"Uploaded Photos"} imageSources={IMAGES} />
      <div className="m-5 mx-6">
        <ReviewDisplay reviews={sampleReviews} />
      </div>
    </GenericModal>
  );
}
