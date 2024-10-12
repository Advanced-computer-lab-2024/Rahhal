import { GenericModal } from "@/components/GenericModal";
import {
  THistoricalPlace,
  TNewHistoricalPlace,
} from "@/features/tourism-governor/utils/tourism-governor-columns";
import { useEffect, useState } from "react";
import PictureCard from "@/components/PictureCard";
import ShortText from "@/components/ShortText";
import ReviewDisplay from "@/components/Ratings";
import { IMAGES, sampleReviews } from "@/lib/utils";
import { fetchCategories } from "@/api-calls/categories-api-calls";
import { fetchPreferenceTags } from "@/api-calls/preference-tags-api-calls";
import {
  createHistoricalPlace,
  updateHistoricalPlace,
} from "@/api-calls/historical-places-api-calls";
import TimeRange from "@/components/TimeRange";
import LocationMap from "@/components/google-maps/LocationMap";
import { GenericSelect } from "@/components/GenericSelect";
import TagsSelector from "@/components/TagsSelector";
import { DEFAULTS } from "@/lib/constants";
import { fetchHistoricalTags } from "@/api-calls/historical-tags-api-calls";
import LongText from "@/components/LongText";
import PriceCategories from "@/components/price-categories";

interface HistoricalPlacesModalProps {
  historicalPlaceData?: THistoricalPlace;
  dialogTrigger?: React.ReactNode;
  userId?: string;
}

export function HistoricalPlacesModal({
  historicalPlaceData,
  dialogTrigger,
  userId,
}: HistoricalPlacesModalProps) {
  const isNewHistoricalPlace: boolean = historicalPlaceData === undefined;
  const [modalHistoricalPlaceData, setModalHistoricalPlaceData] = useState<
    THistoricalPlace | undefined
  >(historicalPlaceData); // current activity data present in the modal

  const [modalDBData, setModalDBData] = useState<{ [key: string]: any }>({
    categories: [],
    preferenceTags: [],
    historicalTags: [],
  }); // holds the data fetched from the server like categories and preference tags, etc.

  const extractIds = (data: ({ _id: string } & Record<string, any>)[]) => {
    const ids = data.map(({ _id }) => _id);
    const FIRST_ELEMENT = 0;
    if (ids.length === 1) return ids[FIRST_ELEMENT];
    return ids;
  };

  const handleSubmit = async () => {
    console.log(modalHistoricalPlaceData);
    console.log(isNewHistoricalPlace);
    if (isNewHistoricalPlace) {
      // For fields that are referenced in the database by ids, we need to extract them first
      // since the database will only accept for these field an id or list of ids
      const categoryId = extractIds([modalHistoricalPlaceData!.category]) as string;
      const preferenceTagsIds = extractIds(modalHistoricalPlaceData!.preferenceTags) as string[];
      const tagsIds = extractIds(modalHistoricalPlaceData!.tags) as string[];
      const { _id, ...rest } = modalHistoricalPlaceData!;
      const newHistoricalPlace: TNewHistoricalPlace = {
        ...rest,
        category: categoryId,
        preferenceTags: preferenceTagsIds,
        tags: tagsIds,
      };
      // I am sure that userId is not null when the modal open from table add button
      // otherwise it opens from an edit action and in that situation userId is not null
      // and already stored in the database and it's not needed in updates
      await createHistoricalPlace(newHistoricalPlace, userId!);
    } else await updateHistoricalPlace(modalHistoricalPlaceData!);
  };

  useEffect(() => {
    const init = async () => {
      const categories = await fetchCategories();
      const preferenceTags = await fetchPreferenceTags();
      const historicalTags = await fetchHistoricalTags();

      setModalDBData({ ...modalDBData, categories, preferenceTags, historicalTags });

      if (isNewHistoricalPlace) {
        setModalHistoricalPlaceData(DEFAULTS.HISTORICAL_PLACE);
      }
    };
    init();
  }, []);

  // create generic modal with components based on data type of columns
  return (
    <GenericModal
      title={historicalPlaceData?.name ?? "New Historical Place"}
      description="Historical Place Details"
      dialogTrigger={dialogTrigger}
      onSubmit={handleSubmit}
    >
      <ShortText
        title="Name"
        type={"text"}
        initialValue={modalHistoricalPlaceData?.name ?? ""}
        onSave={(value) =>
          setModalHistoricalPlaceData(
            modalHistoricalPlaceData ? { ...modalHistoricalPlaceData, name: value } : undefined,
          )
        }
        placeholder={"Enter the name of the historical place"}
        initialDisabled={!isNewHistoricalPlace}
      />

      <PriceCategories
        title="Prices"
        priceCategories={modalHistoricalPlaceData?.price ?? {}}
        initialIsDisabled={!isNewHistoricalPlace}
        onPriceCategoriesChange={(value) => {
          setModalHistoricalPlaceData(
            modalHistoricalPlaceData
              ? {
                  ...modalHistoricalPlaceData,
                  price: value,
                }
              : undefined,
          );
        }}
      />

      <LongText
        title="Description"
        initialValue={modalHistoricalPlaceData?.description ?? ""}
        onSave={(value) =>
          setModalHistoricalPlaceData(
            modalHistoricalPlaceData
              ? { ...modalHistoricalPlaceData, description: value }
              : undefined,
          )
        }
        placeholder={"Enter a detailed description"}
        initialDisabled={!isNewHistoricalPlace}
      />

      <GenericSelect
        label="Category"
        placeholder="Select a category"
        options={modalDBData.categories.map((category: { name: any; _id: any }) => ({
          label: category.name,
          value: category._id,
        }))}
        onSelect={(value: string) => {
          console.log(value);
          const selectedCategory = modalDBData.categories.find(
            (category: { _id: string }) => category._id === value,
          );
          setModalHistoricalPlaceData(
            modalHistoricalPlaceData
              ? { ...modalHistoricalPlaceData, category: selectedCategory }
              : undefined,
          );
        }}
        initialValue={modalHistoricalPlaceData?.category._id ?? ""}
      />

      <TagsSelector
        placeholder={"Select preference tags"}
        isEditingInitially={isNewHistoricalPlace}
        options={modalDBData?.preferenceTags.map((tag: any) => ({
          label: tag.name,
          value: tag._id,
        }))}
        onSave={(value) =>
          setModalHistoricalPlaceData(
            modalHistoricalPlaceData
              ? {
                  ...modalHistoricalPlaceData,
                  preferenceTags: value.map((option) => ({
                    _id: option.value,
                    name: option.label,
                  })),
                }
              : undefined,
          )
        }
        initialOptions={modalHistoricalPlaceData?.preferenceTags?.map((preferenceTag) => ({
          label: preferenceTag.name,
          value: preferenceTag._id,
        }))}
      />

      <TagsSelector
        placeholder={"Select tags"}
        isEditingInitially={isNewHistoricalPlace}
        options={modalDBData?.historicalTags.map((tag: any) => ({
          label: tag.name,
          value: tag._id,
        }))}
        onSave={(value) =>
          setModalHistoricalPlaceData(
            modalHistoricalPlaceData
              ? {
                  ...modalHistoricalPlaceData,
                  tags: value.map((option) => ({
                    _id: option.value,
                    name: option.label,
                  })),
                }
              : undefined,
          )
        }
        initialOptions={modalHistoricalPlaceData?.tags?.map((tag) => ({
          label: tag.name,
          value: tag._id,
        }))}
      />

      <TimeRange
        initialCheckInTime={modalHistoricalPlaceData?.openingHours.open}
        initialCheckOutTime={modalHistoricalPlaceData?.openingHours.close}
        isEditingInitially={isNewHistoricalPlace}
        labels={{ startTimeLabel: "Opening Time", endTimeLabel: "Closing Time" }}
        onSave={(startTime, endTime) => {
          setModalHistoricalPlaceData(
            modalHistoricalPlaceData
              ? {
                  ...modalHistoricalPlaceData,
                  openingHours: { open: startTime!, close: endTime! },
                }
              : undefined,
          );
        }}
      />

      <PictureCard
        title={"Photo Tour"}
        description={"Uploaded Photos"}
        imageSources={isNewHistoricalPlace ? [] : (modalHistoricalPlaceData?.images ?? IMAGES)}
      />
      <ReviewDisplay reviews={sampleReviews} />

      <LocationMap
        isEditingInitially={isNewHistoricalPlace}
        initialLocation={
          modalHistoricalPlaceData
            ? {
                lat: modalHistoricalPlaceData.location.latitude,
                lng: modalHistoricalPlaceData.location.longitude,
              }
            : {
                lat: DEFAULTS.HISTORICAL_PLACE.location.latitude,
                lng: DEFAULTS.HISTORICAL_PLACE.location.longitude,
              }
        }
        onSave={(location) =>
          setModalHistoricalPlaceData(
            modalHistoricalPlaceData
              ? {
                  ...modalHistoricalPlaceData,
                  location: { latitude: location.lat, longitude: location.lng },
                }
              : undefined,
          )
        }
      />
    </GenericModal>
  );
}
