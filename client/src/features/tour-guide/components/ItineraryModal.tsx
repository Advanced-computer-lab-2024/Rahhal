import { GenericModal } from "@/components/GenericModal";
import { TItinerary, TNewItinerary } from "@/features/tour-guide/utils/tour-guide-columns";
import { useEffect, useState , useRef} from "react";
import PictureCard from "@/components/PictureCard";
import ShortText from "@/components/ShortText";
import LongText from "@/components/LongText";
import LocationMap from "@/components/google-maps/LocationMap";
import TagsSelector from "@/components/TagsSelector";
import { GenericSelect } from "@/components/GenericSelect";
import { createItinerary } from "@/api-calls/itineraries-api-calls";
import { updateItinerary } from "@/api-calls/itineraries-api-calls";
import { fetchCategories } from "@/api-calls/categories-api-calls";
import { fetchPreferenceTags } from "@/api-calls/preference-tags-api-calls";
import { DEFAULTS } from "@/lib/constants";
import MultipleSelector from "@/components/ui/multiple-selector";
import ItineraryActivities from "@/features/tour-guide/components/itinerary-activities/ItineratyActivities";
import ItineraryAvailableDatesAndTimes from "@/features/tour-guide/components/itinerary-available-dates-times/ItineraryAvailableDatesAndTimes";
import ItineraryLocations from "@/features/tour-guide/components/itinerary-locations/ItineraryLocations";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { STATUS_CODES } from "@/lib/constants";
import { deleteItinerary } from "@/api-calls/itineraries-api-calls";
import { Label } from "@/components/ui/label";
import { FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import useUserStore from "@/stores/user-state-store";

interface ItinerariesModalProps {
  itineraryData?: TItinerary;
  dialogTrigger?: React.ReactNode;
  userId?: string;
  username?: string;
}

export function ItinerariesModal({
  itineraryData,
  dialogTrigger,
  username,
}: ItinerariesModalProps) {
  const { id } = useUserStore();
  const isNewItinerary: boolean = itineraryData === undefined;
  const [step, setStep] = useState(1); 
  const modalContentRef = useRef<HTMLDivElement | null>(null); // Ref so i always return to the top of the modal
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
      await createItinerary(newItinerary, id!, username!, itineraryImages);
    } else await updateItinerary(modalItineraryData!, itineraryImages);
  };

  const scrollToTop = () => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDeleteItinerary = async (itinerary: TItinerary) => {
    try {
      const response = await deleteItinerary(itinerary);
      if (response.status === STATUS_CODES.STATUS_OK) {
        toast({
          title: "Success",
          description: "Itinerary deleted successfully",
          variant: "default",
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as any).response?.data?.message || "Error deleting itinerary",
        variant: "destructive",
      });
    }
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

  // navigation betweem the 3 modals
  const handleNext = () => {
    setStep((prev) => prev + 1);
    scrollToTop();
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
    scrollToTop();
  };

  return (
    <GenericModal
    title="Itinerary Details"
    description=""
    dialogTrigger={dialogTrigger}
    onSubmit={handleSubmit}
  >
   <Button variant="destructive" className="fixed top-2 right-9" onClick={() => handleDeleteItinerary(itineraryData!)}>
      <span className="sr-only">Delete</span>
      <FaTrash className="h-4 w-4" />
  </Button>
  <div ref={modalContentRef}>
    {step ==1 && (
      <div>
        <div className="mb-6">
        <ShortText
          title="Itinerary Name"
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
        </div>
        <div className="mb-6">
        <PictureCard
          title={"Itinerary Photos"}
          description={"Uploaded Photos"}
          initialImageSources={itineraryData?.images ?? []}
          handleFileUploadCallback={(files) => {
            setItineraryImages(files);
          }}
        />
        </div>
        <div className="mb-6">
          <LongText
        title="Description of the itinerary"
        initialValue={modalItineraryData?.description ?? ""}
        onSave={(value) =>
          setModalItinerariesData(
            modalItineraryData ? { ...modalItineraryData, description: value } : undefined,
          )
        }
        placeholder="Enter itinerary description"
        initialDisabled={!isNewItinerary}
      />
      </div>
      <div className="m-5 mx-6">
      <label className="text-sm font-medium text-black-700">Category</label>
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
      </div>
      <div className="m-5 mx-6">
          <label className="text-sm font-medium text-black-700">Preference Tags</label>
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
       </div>
       )}
       {step == 2 && (
        <div>
        <div className="mb-6">
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
        </div>
        <div className="mb-6">
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
        </div>
        <div className="mb-6">
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
      </div>
      <div className="mb-6">
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
      </div>
      <div className="mb-6">
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
      </div>
        </div>
       )}
      {step == 3 && (
        <div>
        <div className="mb-6">
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
      </div>
      <div className="mb-6">
      <ShortText
      title="Price (EGP)"
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
    </div>
    <div className="mb-6">
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
      </div>
       <div className="m-5 mx-6">
          <label className="text-sm font-medium text-black-700">Language</label>
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
      </div>
      <div className="flex items-center space-x-2 pt-4">
        <Checkbox
          id="inactive"
          checked={modalItineraryData?.active === false}
          onCheckedChange={(checked) => {
            setModalItinerariesData((prevData) => {
              if (prevData) {
                return {
                  ...prevData,
                  active: !checked,
                };
              }
              return prevData;
            });
          }}
        />
        <Label
          htmlFor="inactive"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Deactivate Itinerary
        </Label>
      </div>
     
        </div>

        )}
        </div>
         {/* Footer Navigation */}
         <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md flex justify-between items-center">
         <button
      disabled={step === 1}
      onClick={handlePrevious}
      className={`py-2 px-4 rounded ${step === 1 ? "bg-gray-300" : "bg-black text-white"}`}
    >
      Previous
    </button>
     {/* Step Indicators */}
     <div className="flex justify-center space-x-2">
        {[1, 2, 3].map((stepNumber) => (
          <div
            key={stepNumber}
            className={`w-3 h-3 rounded-full ${
              step === stepNumber ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    <button
      onClick={step < 3 ? handleNext : handleSubmit}
      className="py-2 px-4 bg-black text-white rounded"
    >
      {step < 3 ? "Next" : "Save Changes"}
    </button>
  </div>
     
    </GenericModal>
  );
}
