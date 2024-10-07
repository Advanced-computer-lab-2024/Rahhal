import { GenericModal } from "../../GenericModal";
import { TItinerary } from "@/table-columns/tour-guide-columns";
import { useEffect, useState } from "react";
import PictureCard from "../../PictureCard";
import ShortText from "../../ShortText";
import LongText from "../../LongText";
import LocationMap from "@/components/google-maps/LocationMap";
import multipleSelector from "@/components/ui/multiple-selector";
import TagsSelector from "../TagsSelector";
import { GenericSelect } from "../../GenericSelect";
import ReviewDisplay from "../Ratings";
import { IMAGES, sampleReviews } from "@/lib/utils";
import { submitItinerary } from "@/api-calls/itineraries-api-calls";
import { fetchCategories } from "@/api-calls/categories-api-calls";
import { fetchPreferenceTags } from "@/api-calls/preference-tags-api-calls";
import { DEFAULTS } from "@/lib/constants";
import MultipleSelector from "@/components/ui/multiple-selector";
import ItineraryActivities from "@/components/itinerary-activities/ItineratyActivities";
import ItineraryAvailableDatesAndTimes from "@/components/itinerary-available-dates-times/ItineraryAvailableDatesAndTimes";
import ItineraryLocations from "@/components/itinerary-locations/ItineraryLocations";

interface ItinerariesModalProps {
    itineraryData?: TItinerary;
    dialogTrigger?: React.ReactNode;
    }

export function ItinerariesModal({ itineraryData, dialogTrigger }: ItinerariesModalProps) {
    const isNewItinerary: boolean = itineraryData === undefined;
    const [modalItineraryData, setModalItinerariesData] = useState<TItinerary | undefined>(itineraryData); 
    const [modalDBData, setModalDBData] = useState<{ [key: string]: any }>({
        categories: [],
        preferenceTags: [],
    }); 

    useEffect(() => {
        const init = async () => {
            const categories = await fetchCategories();
            const preferenceTags = await fetchPreferenceTags();

            setModalDBData({ ...modalDBData, categories, preferenceTags });

            // if the itinerary is new, set the modal data to default values
            if(isNewItinerary) {
                setModalItinerariesData(DEFAULTS.ITINERARY);
            }
        };
        init();
    }, []);

    const activitiesWithDurations = modalItineraryData?.activities.map((activity, index) => ({
        name: activity,
        duration: modalItineraryData.durationOfActivities[index] || 0
    })) || [];
return (
    <GenericModal
      title={itineraryData?.name ?? "New Itinerary"}
      description="Itinerary Details"
      dialogTrigger={dialogTrigger}
      onSubmit={() => submitItinerary(modalItineraryData, isNewItinerary)}
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
        />
          <PictureCard title={"Photo Tour"} description={"Uploaded Photos"} imageSources={IMAGES} />
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
            itineraryActivities={activitiesWithDurations.map(activity => ({ type: activity.name, duration: activity.duration.toString() }))}
            onItineraryActivityChange={(activities) => {
                setModalItinerariesData(
                    modalItineraryData ? { ...modalItineraryData, activities: activities.map((activity) => activity.type), durationOfActivities: activities.map((activity) => activity.duration) } : undefined
                );
            }}

        />
   <ItineraryLocations
  locations={modalItineraryData?.locations.map(location => ({
    lat: location.latitude,
    lng: location.longitude,
  })) ?? []}
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
            { label: "English", value: "english" },{label: "Spanish", value: "spanish"},
            {label: "French", value: "french"}, {label: "German", value: "german"},
            {label: "Chinese", value: "chinese"}, {label: "Japanese", value: "japanese"},
            {label: "Korean", value: "korean"}, {label: "Italian", value: "italian"},
            {label: "Russian", value: "russian"}, {label: "Arabic", value: "arabic"},
        ]}
        placeholder="Select languages"
        value={modalItineraryData?.languages.map(lang => ({ label: lang, value: lang })) ?? []}
        onChange={(options: { label: string; value: string }[]) =>
            setModalItinerariesData(
            modalItineraryData ? { ...modalItineraryData, languages: options.map(option => option.value) } : undefined,
            )
        }
        />
        <ShortText
            title="Price"
            initialValue={modalItineraryData?.price.toString() ?? ""}
            onSave={(value) => setModalItinerariesData(
                modalItineraryData ? { ...modalItineraryData, price: parseFloat(value) } : undefined
            )} 
            placeholder={"Enter itinerary price"}  
            initialDisabled={!isNewItinerary}
        /> 
        <ShortText 
            title="Accessibility"
            initialValue={modalItineraryData?.accessibility ?? ""}
            onSave={(value) => setModalItinerariesData(
                modalItineraryData ? { ...modalItineraryData, accessibility: value } : undefined
            )
            }
            placeholder={"Enter itinerary accessibility"}
            initialDisabled={!isNewItinerary}
        />
    
    <div className="m-5 mx-6">
    <div className="mb-2">
      <label className="text-sm font-medium text-black-700">Categories</label>
    </div>
    </div>
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
            setModalItinerariesData(
              modalItineraryData ? { ...modalItineraryData, category: selectedCategory } : undefined,
            );
          }}
          initalValue={modalItineraryData?.category._id ?? ""}
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
                              preferenceTag: option.label,
                            })),
                          }
                        : undefined,
                    )
        }
        initialOptions={modalItineraryData?.preferenceTags?.map((tag) => ({
          label: tag.preferenceTag,
          value: tag._id,
        }))}
      />
  </div>

  <LocationMap
  title ="Pick Up Location"
            initialLocation={modalItineraryData?.pickUpLocation ? { lat: modalItineraryData.pickUpLocation.latitude, lng: modalItineraryData.pickUpLocation.longitude } : { lat: 0, lng: 0 }}
            onSave={(location: { lat: number; lng: number }) => setModalItinerariesData(
                modalItineraryData ? { ...modalItineraryData, pickUpLocation: { ...modalItineraryData.pickUpLocation, latitude: location.lat, longitude: location.lng } } : undefined
            )}
        />
        <LocationMap
        title = "Drop Off Location"
            initialLocation={modalItineraryData?.dropOffLocation ? { lat: modalItineraryData.dropOffLocation.latitude, lng: modalItineraryData.dropOffLocation.longitude } : { lat: 0, lng: 0 }}
            onSave={(location: { lat: number; lng: number }) => setModalItinerariesData(
                modalItineraryData ? { ...modalItineraryData, dropOffLocation: { ...modalItineraryData.dropOffLocation, latitude: location.lat, longitude: location.lng } } : undefined
            )}
        />
      
      <div className="m-5 mx-6">
        <ReviewDisplay reviews={sampleReviews} />
      </div>
        
      </GenericModal>

);
}   