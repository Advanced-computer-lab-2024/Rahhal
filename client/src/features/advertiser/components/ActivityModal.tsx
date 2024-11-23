import { GenericModal } from "@//components/GenericModal";
import { TActivity, TNewActivity } from "@/features/advertiser/utils/advertiser-columns";
import { ToggleableSwitchCard } from "@//components/ToggleableSwitchCard";
import { DoorOpen } from "lucide-react";
import { useEffect, useState } from "react";
import PictureCard from "@/components/PictureCard";
import ShortText from "@/components/ShortText";
import PriceCategories from "@/components/price-categories";
import TagsSelector from "@//components/TagsSelector";
import { GenericSelect } from "@//components/GenericSelect";
import EditableTimePicker from "@//components/EditableTimePicker";
import EditableDatePicker from "@//components/EditableDatePicker";
import { createActivity, updateActivity } from "@/api-calls/activities-api-calls";
import { fetchCategories } from "@/api-calls/categories-api-calls";
import { fetchPreferenceTags } from "@/api-calls/preference-tags-api-calls";
import { DEFAULTS } from "@/lib/constants";
import LocationMap from "@/components/google-maps/LocationMap";
import LongText from "@/components/LongText";

interface ActivitiesModalProps {
  activityData?: TActivity;
  dialogTrigger?: React.ReactNode;
  userId?: string;
  username?: string;
}

export function ActivitiesModal({
  activityData,
  dialogTrigger,
  userId,
  username,
}: ActivitiesModalProps) {
  const isNewActivity: boolean = activityData === undefined; // check if the activity is new or existing
  const [modalActivityData, setModalActivitiesData] = useState<TActivity | undefined>(activityData); // current activity data present in the modal

  const [modalDBData, setModalDBData] = useState<{ [key: string]: any }>({
    categories: [],
    preferenceTags: [],
    tags: [],
  }); // holds the data fetched from the server like categories and preference tags, etc.

  const [activityPictures, setActivityPictures] = useState<FileList | null>(null); // holds the pictures uploaded by the user

  const extractIds = (data: ({ _id: string } & Record<string, any>)[]) => {
    const ids = data.map(({ _id }) => _id);
    const FIRST_ELEMENT = 0;
    if (ids.length === 1) return ids[FIRST_ELEMENT];
    return ids;
  };

  const handleSubmit = async () => {
    const { _id, ...rest } = modalActivityData!;

    if (isNewActivity) {
      // For fields that are referenced in the database by ids, we need to extract them first
      // since the database will only accept for these field an id or list of ids
      const categoryId = extractIds([modalActivityData!.category]) as string;
      const preferenceTagsIds = extractIds(modalActivityData!.preferenceTags) as string[];

      const newActivity: TNewActivity = {
        ...rest,
        category: categoryId,
        preferenceTags: preferenceTagsIds,

        // TODO - should be removed later when we settle down on its removal
        tags: preferenceTagsIds,
      };
      // I am sure that userId is not null when the modal open from table add button
      // otherwise it opens from an edit action and in that situation userId is not null
      // and already stored in the database and it's not needed in updates
      await createActivity(newActivity, userId!, username!, activityPictures);
    } else await updateActivity(modalActivityData!, activityPictures);
  };

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
      onSubmit={handleSubmit}
    >
      <ShortText
        title="Name"
        type={"text"}
        initialValue={modalActivityData?.name ?? ""}
        onSave={(value) =>
          setModalActivitiesData(
            modalActivityData ? { ...modalActivityData, name: value } : undefined,
          )
        }
        placeholder={"Enter name"}
        initialDisabled={!isNewActivity}
      />

      <LongText
        title="Description"
        initialValue={modalActivityData?.description ?? ""}
        onSave={(value) =>
          setModalActivitiesData(
            modalActivityData ? { ...modalActivityData, description: value } : undefined,
          )
        }
        placeholder={"Enter a detailed description"}
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

      <LocationMap
        isEditingInitially={isNewActivity}
        initialLocation={
          modalActivityData
            ? {
                lat: modalActivityData.location.latitude,
                lng: modalActivityData.location.longitude,
              }
            : {
                lat: DEFAULTS.HISTORICAL_PLACE.location.latitude,
                lng: DEFAULTS.HISTORICAL_PLACE.location.longitude,
              }
        }
        onSave={(location) =>
          setModalActivitiesData(
            modalActivityData
              ? {
                  ...modalActivityData,
                  location: { latitude: location.lat, longitude: location.lng },
                }
              : undefined,
          )
        }
      />
      <PriceCategories
        title="Prices"
        priceCategories={modalActivityData?.price ?? {}}
        initialIsDisabled={!isNewActivity}
        onPriceCategoriesChange={(value) => {
          setModalActivitiesData(
            modalActivityData
              ? {
                  ...modalActivityData,
                  price: value,
                }
              : undefined,
          );
        }}
      />
      <GenericSelect
        label="Category"
        placeholder="Select a category"
        options={modalDBData.categories.map((category: { name: any; _id: any }) => ({
          label: category.name,
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
        initialValue={modalActivityData?.category._id ?? ""}
      />
      <ShortText
        title="Special Discounts"
        type={"number"}
        initialValue={modalActivityData?.specialDiscount.toString() ?? "0"}
        onSave={(value) => {
          setModalActivitiesData(
            modalActivityData
              ? { ...modalActivityData, specialDiscount: Number(value) }
              : undefined,
          );
        }}
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
      <TagsSelector
        placeholder={"Select preference tags"}
        isEditingInitially={isNewActivity}
        options={modalDBData?.preferenceTags.map((tag: any) => ({
          label: tag.name,
          value: tag._id,
        }))}
        onSave={(value) =>
          setModalActivitiesData(
            modalActivityData
              ? {
                  ...modalActivityData,
                  preferenceTags: value.map((option) => ({
                    _id: option.value,
                    name: option.label,
                  })),
                }
              : undefined,
          )
        }
        initialOptions={modalActivityData?.preferenceTags?.map((preferenceTag) => ({
          label: preferenceTag.name,
          value: preferenceTag._id,
        }))}
      />

      <PictureCard
        title={"Photo Tour"}
        description={"Uploaded Photos"}
        initialImageSources={activityData?.images ?? []}
        handleFileUploadCallback={(files) => setActivityPictures(files)}
      />
    </GenericModal>
  );
}
