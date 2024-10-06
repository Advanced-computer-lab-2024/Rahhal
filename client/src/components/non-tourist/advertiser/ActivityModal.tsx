import { GenericModal } from "../../GenericModal";
import { TActivity } from "@/table-columns/advertiser-columns";
import { ToggleableSwitchCard } from "../../ToggleableSwitchCard";
import { DoorOpen } from "lucide-react";
import { useEffect, useState } from "react";
import PictureCard from "../../PictureCard";
import ShortText from "../../ShortText";
import PriceCategories from "../../price-categories/PriceCategories";
import TagsSelector from "../TagsSelector";
import { GenericSelect } from "../../GenericSelect";
import ReviewDisplay from "../Ratings";
import EditableTimePicker from "../EditableTimePicker";
import EditableDatePicker from "../EditableDatePicker";
import { IMAGES, sampleReviews } from "@/lib/utils";
import { submitActivity } from "@/api-calls/activities-api-calls";
import { fetchCategories } from "@/api-calls/categories-api-calls";
import { fetchPreferenceTags } from "@/api-calls/preference-tags-api-calls";
import { DEFAULTS } from "@/lib/constants";

interface ActivitiesModalProps {
  activityData?: TActivity;
  dialogTrigger?: React.ReactNode;
}

export function ActivitiesModal({ activityData, dialogTrigger }: ActivitiesModalProps) {
  const isNewActivity: boolean = activityData === undefined; // check if the activity is new or existing
  const [modalActivityData, setModalActivitiesData] = useState<TActivity | undefined>(activityData); // current activity data present in the modal

  const [modalDBData, setModalDBData] = useState<{ [key: string]: any }>({
    categories: [],
    preferenceTags: [],
    tags: [],
  }); // holds the data fetched from the server like categories and preference tags, etc.

  useEffect(() => {
    const init = async () => {
      const categories = await fetchCategories();
      const preferenceTags = await fetchPreferenceTags();

      setModalDBData({ ...modalDBData, categories, preferenceTags, tags: preferenceTags });

      // if the activity is new, set the modal data to default values
      if (isNewActivity) {
        setModalActivitiesData(DEFAULTS.ACTIVITY);
      }
    };
    init();
  }, []);

  // create generic modal with components based on data type of columns
  return (
    <GenericModal
      title={activityData?.name ?? "New Activity"}
      description="Activity Details"
      dialogTrigger={dialogTrigger}
      onSubmit={() => submitActivity(modalActivityData, isNewActivity)}
    >
      <ShortText
        title="Name"
        initialValue={modalActivityData?.name ?? ""}
        onSave={(value) =>
          setModalActivitiesData(
            modalActivityData ? { ...modalActivityData, name: value } : undefined,
          )
        }
        placeholder={"Enter name"}
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
        Location: {activityData?.location?.longitude ?? "N/A"},{" "}
        {activityData?.location?.latitude ?? "N/A"}
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
            placeholder={"Enter price"}
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
          options={modalDBData.categories.map((category: { category: any; _id: any }) => ({
            label: category.category,
            value: category._id,
          }))}
          onSelect={(value: string) => {
            const selectedCategory = modalDBData.categories.find(
              (category: { _id: string }) => category._id === value,
            );
            setModalActivitiesData(
              modalActivityData ? { ...modalActivityData, category: selectedCategory } : undefined,
            );
          }}
          initalValue={modalActivityData?.category._id ?? ""}
        />
      </div>
      <div className="m-5 mx-6">
        <TagsSelector
          placeholder={"Select tags"}
          options={modalDBData?.tags.map((tag: string) => ({ label: tag, value: tag }))}
          onSave={(value) =>
            setModalActivitiesData(
              modalActivityData
                ? {
                    ...modalActivityData,
                    tags: value.map((option) => ({
                      _id: option.value,
                      preferenceTag: option.label,
                    })),
                  }
                : undefined,
            )
          }
          initialOptions={modalActivityData?.tags?.map((tag) => ({
            label: tag.preferenceTag,
            value: tag._id,
          }))}
        />
      </div>
      <ShortText
        title="Special Discounts"
        initialValue={modalActivityData?.specialDiscounts.join(", ") ?? ""}
        //TODO - do something here
        onSave={(value) => {}}
        placeholder={"Enter special discounts"}
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
          options={modalDBData?.preferenceTags.map((tag: string) => ({ label: tag, value: tag }))}
          onSave={(value) =>
            setModalActivitiesData(
              modalActivityData
                ? {
                    ...modalActivityData,
                    preferenceTags: value.map((option) => ({
                      _id: option.value,
                      preferenceTag: option.label,
                    })),
                  }
                : undefined,
            )
          }
          initialOptions={modalActivityData?.preferenceTags?.map((tag) => ({
            label: tag.preferenceTag,
            value: tag._id,
          }))}
        />
      </div>

      <PictureCard title={"Photo Tour"} description={"Uploaded Photos"} imageSources={IMAGES} />
      <div className="m-5 mx-6">
        <ReviewDisplay reviews={sampleReviews} />
      </div>
    </GenericModal>
  );
}
