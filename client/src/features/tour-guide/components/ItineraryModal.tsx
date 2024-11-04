import { GenericModal } from "@/components/GenericModal";
import { TItinerary, TNewItinerary } from "@/features/tour-guide/utils/tour-guide-columns";
import { useEffect, useState } from "react";
import PictureCard from "@/components/PictureCard";
import ShortText from "@/components/ShortText";
import LongText from "@/components/LongText";
import LocationMap from "@/components/google-maps/LocationMap";
import TagsSelector from "@/components/TagsSelector";
import { GenericSelect } from "@/components/GenericSelect";
import ReviewDisplay from "@/components/Ratings";
import { sampleReviews } from "@/lib/utils";
import { createItinerary } from "@/api-calls/itineraries-api-calls";
import { updateItinerary } from "@/api-calls/itineraries-api-calls";
import { fetchCategories } from "@/api-calls/categories-api-calls";
import { fetchPreferenceTags } from "@/api-calls/preference-tags-api-calls";
import { DEFAULTS } from "@/lib/constants";
import MultipleSelector from "@/components/ui/multiple-selector";
import ItineraryActivities from "@/features/tour-guide/components/itinerary-activities/ItineratyActivities";
import ItineraryAvailableDatesAndTimes from "@/features/tour-guide/components/itinerary-available-dates-times/ItineraryAvailableDatesAndTimes";
import ItineraryLocations from "@/features/tour-guide/components/itinerary-locations/ItineraryLocations";
import { useParams } from "react-router-dom";

interface ItinerariesModalProps {
  itineraryData?: TItinerary;
  dialogTrigger?: React.ReactNode;
  userId?: string;
}

export function ItinerariesModal({ itineraryData, dialogTrigger, userId }: ItinerariesModalProps) {
  const { id } = useParams();
  const isNewItinerary: boolean = itineraryData === undefined;
  const [modalItineraryData, setModalItinerariesData] = useState<TItinerary | undefined>(
    itineraryData ?? DEFAULTS.ITINERARY,
  );
  const [modalDBData, setModalDBData] = useState<{ [key: string]: any }>({
    categories: [],
    preferenceTags: [],
  });
  const [activitiesWithDurations, setActivitiesWithDurations] = useState<
    { name: string; duration: string }[]
  >([]);

  const [itineraryImages, setItineraryImages] = useState<FileList | null>(null);

  const extractIds = (data: ({ _id: string } & Record<string, any>)[]) => {
    const ids = data.map(({ _id }) => _id);
    const FIRST_ELEMENT = 0;
    if (ids.length === 1) return ids[FIRST_ELEMENT];
    return ids;
  };

  const handleSubmit = async () => {
    if (isNewItinerary) {
      // For fields that are referenced in the database by ids, we need to extract them first
      // since the database will only accept for these field an id or list of ids
      const categoryId = extractIds([modalItineraryData!.category]) as string;
      const preferenceTagsIds = extractIds(modalItineraryData!.preferenceTags) as string[];
      const { _id, ...rest } = modalItineraryData!;
      const newItinerary: TNewItinerary = {
        ...rest,
        category: categoryId,
        preferenceTags: preferenceTagsIds,
        owner: id!,
      };
      // I am sure that userId is not null when the modal open from table add button
      // otherwise it opens from an edit action and in that situation userId is not null
      // and already stored in the database and it's not needed in updates
      await createItinerary(newItinerary, id!, itineraryImages);
    } else await updateItinerary(modalItineraryData!, itineraryImages);
  };

  useEffect(() => {
    const init = async () => {
      const categories = await fetchCategories();
      const preferenceTags = await fetchPreferenceTags();

      setModalDBData({ ...modalDBData, categories, preferenceTags });

      // if the itinerary is new, set the modal data to default values
      if (isNewItinerary) {
        setModalItinerariesData(DEFAULTS.ITINERARY);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (!modalItineraryData) return;
    if (!modalItineraryData.activities) return;
    if (!modalItineraryData.durationOfActivities) return;

    console.log(modalItineraryData);
    let newActivities = [];
    let newDurations = [];
    for (let i = 0; i < modalItineraryData.activities.length; i++) {
      newActivities.push(modalItineraryData.activities[i]);
    }
    for (let i = 0; i < modalItineraryData.durationOfActivities.length; i++) {
      newDurations.push(modalItineraryData.durationOfActivities[i]);
    }
    setActivitiesWithDurations(
      newActivities.map((activity, index) => ({ name: activity, duration: newDurations[index] })),
    );
  }, [modalItineraryData]);
  return (
    <GenericModal
      title={itineraryData?.name ?? "New Itinerary"}
      description="Itinerary Details"
      dialogTrigger={dialogTrigger}
      onSubmit={handleSubmit}
    >
      <ShortText
        title="Name"
        initialValue={modalItineraryData?.name ?? ""}
        onSave={(value) =>
          setModalItinerariesData(
            modalItineraryData ? { ...modalItineraryData, name: value } : undefined,
          )
        }
        placeholder="Enter itinerary name"
        initialDisabled={!isNewItinerary}
        type="text"
      />
      <PictureCard title={"Photo Tour"} description={"Uploaded Photos"} initialImageSources={itineraryData?.images ?? []} handleFileUploadCallback={(files) => { setItineraryImages(files); }} />
      <LongText
        title="Description"
        initialValue={modalItineraryData?.description ?? ""}
        onSave={(value) =>
          setModalItinerariesData(
            modalItineraryData ? { ...modalItineraryData, description: value } : undefined,
          )
        }
        placeholder="Enter itinerary description"
        initialDisabled={!isNewItinerary}
      />
      <ItineraryActivities
        title="Activities"
        itineraryActivities={activitiesWithDurations.map((activity) => ({
          type: activity.name,
          duration: activity.duration.toString(),
        }))}
        onItineraryActivityChange={(activities) => {
          setModalItinerariesData(
            modalItineraryData
              ? {
                  ...modalItineraryData,
                  activities: activities.map((activity) => activity.type),
                  durationOfActivities: activities.map((activity) => activity.duration),
                }
              : undefined,
          );
        }}
      />
      <ItineraryLocations
        locations={
          modalItineraryData?.locations.map((location) => ({
            lat: location.latitude,
            lng: location.longitude,
          })) ?? []
        }
        onSave={(newLocations) => {
          setModalItinerariesData((prevData) => {
            const data = prevData || { ...DEFAULTS.ITINERARY };

            return {
              ...data,
              locations: newLocations.map((location) => ({
                latitude: location.lat,
                longitude: location.lng,
              })),
            };
          });
        }}
      />
      <LongText
        title="Time Line Of Itinerary"
        initialValue={modalItineraryData?.timeline ?? ""}
        onSave={(value) =>
          setModalItinerariesData(
            modalItineraryData ? { ...modalItineraryData, timeline: value } : undefined,
          )
        }
        placeholder="Enter itinerary timeline"
        initialDisabled={!isNewItinerary}
      />
      <ItineraryAvailableDatesAndTimes
        availableDatesTime={modalItineraryData?.availableDatesTime ?? []}
        onSave={(newDatesTime) => {
          setModalItinerariesData((prevData) => {
            const updatedData = prevData ?? { ...DEFAULTS.ITINERARY };
            return {
              ...updatedData,
              availableDatesTime: newDatesTime,
            };
          });
        }}
      />

      <div className="m-5 mx-6">
        <div className="mb-2">
          <label className="text-sm font-medium text-black-700">Language</label>
        </div>
      </div>
      <MultipleSelector
        options={[
          { label: "English", value: "english" },
          { label: "Spanish", value: "spanish" },
          { label: "French", value: "french" },
          { label: "German", value: "german" },
          { label: "Chinese", value: "chinese" },
          { label: "Japanese", value: "japanese" },
          { label: "Korean", value: "korean" },
          { label: "Italian", value: "italian" },
          { label: "Russian", value: "russian" },
          { label: "Arabic", value: "arabic" },
        ]}
        placeholder="Select languages"
        value={modalItineraryData?.languages.map((lang) => ({ label: lang, value: lang })) ?? []}
        onChange={(options: { label: string; value: string }[]) =>
          setModalItinerariesData(
            modalItineraryData
              ? { ...modalItineraryData, languages: options.map((option) => option.value) }
              : undefined,
          )
        }
      />
      <ShortText
        title="Price"
        initialValue={modalItineraryData?.price.toString() ?? ""}
        onSave={(value) =>
          setModalItinerariesData(
            modalItineraryData ? { ...modalItineraryData, price: parseFloat(value) } : undefined,
          )
        }
        placeholder={"Enter itinerary price"}
        initialDisabled={!isNewItinerary}
        type="text"
      />
      <ShortText
        title="Accessibility"
        initialValue={modalItineraryData?.accessibility ?? ""}
        onSave={(value) =>
          setModalItinerariesData(
            modalItineraryData ? { ...modalItineraryData, accessibility: value } : undefined,
          )
        }
        placeholder={"Enter itinerary accessibility"}
        initialDisabled={!isNewItinerary}
        type="text"
      />

      <div className="m-5 mx-6">
        <div className="mb-2">
          <label className="text-sm font-medium text-black-700">Categories</label>
        </div>
      </div>
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
          setModalItinerariesData(
            modalItineraryData ? { ...modalItineraryData, category: selectedCategory } : undefined,
          );
        }}
        initialValue={modalItineraryData?.category._id ?? ""}
      />
      <div className="m-5 mx-6">
        <div className="mb-2">
          <label className="text-sm font-medium text-black-700">Preference Tags</label>
        </div>
        <TagsSelector
          placeholder={"Select preference tags"}
          options={modalDBData?.preferenceTags.map((tag: any) => ({
            label: tag.name,
            value: tag._id,
          }))}
          onSave={(value) =>
            setModalItinerariesData(
              modalItineraryData
                ? {
                    ...modalItineraryData,
                    preferenceTags: value.map((option) => ({
                      _id: option.value,
                      name: option.label,
                    })),
                  }
                : undefined,
            )
          }
          initialOptions={modalItineraryData?.preferenceTags?.map((tag) => ({
            label: tag.name,
            value: tag._id,
          }))}
        />
      </div>

      <LocationMap
        title="Pick Up Location"
        initialLocation={
          modalItineraryData?.pickUpLocation
            ? {
                lat: modalItineraryData.pickUpLocation.latitude,
                lng: modalItineraryData.pickUpLocation.longitude,
              }
            : { lat: 0, lng: 0 }
        }
        onSave={(location: { lat: number; lng: number }) =>
          setModalItinerariesData(
            modalItineraryData
              ? {
                  ...modalItineraryData,
                  pickUpLocation: {
                    ...modalItineraryData.pickUpLocation,
                    latitude: location.lat,
                    longitude: location.lng,
                  },
                }
              : undefined,
          )
        }
      />
      <LocationMap
        title="Drop Off Location"
        initialLocation={
          modalItineraryData?.dropOffLocation
            ? {
                lat: modalItineraryData.dropOffLocation.latitude,
                lng: modalItineraryData.dropOffLocation.longitude,
              }
            : { lat: 0, lng: 0 }
        }
        onSave={(location: { lat: number; lng: number }) =>
          setModalItinerariesData(
            modalItineraryData
              ? {
                  ...modalItineraryData,
                  dropOffLocation: {
                    ...modalItineraryData.dropOffLocation,
                    latitude: location.lat,
                    longitude: location.lng,
                  },
                }
              : undefined,
          )
        }
      />

      <div className="m-5 mx-6">
        <ReviewDisplay reviews={sampleReviews} />
      </div>
    </GenericModal>
  );
}
