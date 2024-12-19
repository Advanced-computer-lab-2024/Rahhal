import { GenericModal } from "@//components/GenericModal";
import { TActivity } from "@/features/advertiser/utils/advertiser-columns";
import { ToggleableSwitchCard } from "@//components/ToggleableSwitchCard";
import { DoorOpen } from "lucide-react";
import { useEffect, useState } from "react";
import PictureCard from "@/components/PictureCard";
import PriceCategories from "@/components/price-categories";
import { GenericSelect } from "@//components/GenericSelect";
import { createActivity, updateActivity } from "@/api-calls/activities-api-calls";
import { fetchCategories } from "@/api-calls/categories-api-calls";
import { fetchPreferenceTags } from "@/api-calls/preference-tags-api-calls";
import { DEFAULTS } from "@/lib/constants";
import LocationMap from "@/components/google-maps/LocationMap";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { STATUS_CODES } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/TimePicker";
import MultipleSelector from "@/components/ui/multiple-selector";

interface ActivitiesModalProps {
  activityData?: TActivity;
  dialogTrigger?: React.ReactNode;
  userId?: string;
  username?: string;
  onSubmit?: (activity: TActivity) => void;
  onDelete?: (id: string) => void;
}

export function ActivitiesModal({
  activityData,
  dialogTrigger,
  userId,
  username,
  onDelete,
  onSubmit,
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

  const handleDelete = () => {
    if (modalActivityData && onDelete) {
      onDelete(modalActivityData._id!);
    }
  };

  const handleSubmit = async () => {
    if (!modalActivityData) return;

    try {
      let response;
      if (isNewActivity) {
        toast({
          title: "Saving",
          description: "Saving activity...",
          style: {
            backgroundColor: "#3B82F6",
            color: "white",
          },
        });
        const newActivityData = {
          ...modalActivityData,
          preferenceTags: extractIds(modalActivityData.preferenceTags),
          category: extractIds([modalActivityData.category]),
          tags: extractIds(modalActivityData.tags),
          owner: userId!,
        };

        response = await createActivity(newActivityData, userId!, username!, activityPictures);
      } else {
        response = await updateActivity(modalActivityData, activityPictures);
      }

      if (
        response?.status === STATUS_CODES.STATUS_OK ||
        response?.status === STATUS_CODES.CREATED
      ) {
        toast({
          title: "Success",
          description: "Activity saved successfully",
          style: {
            backgroundColor: "#34D399",
            color: "white",
          },
        });
        if (onSubmit) {
          onSubmit(modalActivityData);
          setModalActivitiesData(DEFAULTS.ACTIVITY);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save activity",
        variant: "destructive",
      });
    }
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
      showDeleteButton={!isNewActivity}
      onDelete={handleDelete}
    >
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Label>Activity Name</Label>
          <Input
            type="text"
            value={modalActivityData?.name}
            onChange={(e) =>
              setModalActivitiesData(
                modalActivityData ? { ...modalActivityData, name: e.target.value } : undefined,
              )
            }
            placeholder="Enter activity name"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Label>Description</Label>
          <Textarea
            value={modalActivityData?.description}
            onChange={(e) =>
              setModalActivitiesData(
                modalActivityData
                  ? { ...modalActivityData, description: e.target.value }
                  : undefined,
              )
            }
            placeholder="Enter activity description"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Label>Date</Label>
          <DatePicker
            date={modalActivityData?.date ?? new Date()}
            setDate={(date) =>
              setModalActivitiesData(
                modalActivityData ? { ...modalActivityData, date: date ?? new Date() } : undefined,
              )
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Label>Time</Label>
          <TimePicker
            date={modalActivityData?.time ?? new Date()}
            onChange={(time) =>
              setModalActivitiesData(
                modalActivityData ? { ...modalActivityData, time: time ?? new Date() } : undefined,
              )
            }
            hourCycle={12}
          />
        </div>
      </div>

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
        title="Activity Prices"
        initialTicketTypes={modalActivityData?.price ?? {}}
        onPriceCategoriesChange={(newPrices) => {
          setModalActivitiesData(
            modalActivityData
              ? {
                  ...modalActivityData,
                  price: newPrices,
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

      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Label>Special Discounts</Label>
          <Input
            type="number"
            value={modalActivityData?.specialDiscount.toString()}
            onChange={(e) =>
              setModalActivitiesData(
                modalActivityData
                  ? { ...modalActivityData, specialDiscount: Number(e.target.value) }
                  : undefined,
              )
            }
            placeholder="Enter special discounts"
          />
        </div>
      </div>
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
      <MultipleSelector
        placeholder={"Select preference tags"}
        defaultOptions={modalDBData?.preferenceTags.map((tag: any) => ({
          label: tag.name,
          value: tag._id,
        }))}
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            no results found.
          </p>
        }
        onChange={(selectedOptions) => {
          setModalActivitiesData(
            modalActivityData
              ? {
                  ...modalActivityData,
                  preferenceTags: selectedOptions.map((option) => ({
                    _id: option.value,
                    name: option.label,
                  })),
                }
              : undefined,
          );
        }}
        value={modalActivityData?.preferenceTags.map((tag) => {
          return { label: tag.name, value: tag._id };
        })}
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
