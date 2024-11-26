import GoogleMap from "@/components/google-maps/GoogleMap";
import SharePopover from "@/components/SharePopover";
import { MapPin, Star, Tag } from "lucide-react";
import React, { useEffect } from "react";
import Review from "./Reviews";
import {
  calculateAverageRating,
  TRating,
} from "@/features/admin/utils/columns-definitions/activities-columns";
import { fetchLocationDetails } from "@/api-calls/google-maps-api-calls";
import ImageGallery from "./ImageGallery";
import Bookmark from "./Bookmark";
import LocationToggle from "./locationToggle";
import Timeline from "./ItineraryTimeline";
import type { TimelineItem } from "./ItineraryTimeline";
import { TbWorld } from "react-icons/tb";

interface ItinerariesPageTemplateProps {
  name: string;
  ownerName: string;
  images: string[];
  description: string;
  dropOffLocation: { longitude: number; latitude: number };
  pickUpLocation: { longitude: number; latitude: number };
  activities: string[];
  durationOfActivities: string[];
  preferenceTagNames: string[];
  ratings: TRating[];
  languages: string[];
  accessibility: string;
  children: React.ReactNode;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export default function ItinerariesPageTemplate({
  name,
  ownerName,
  images,
  description,
  activities,
  durationOfActivities,
  dropOffLocation,
  pickUpLocation,
  preferenceTagNames,
  ratings,
  languages,
  accessibility,
  children,
}: ItinerariesPageTemplateProps) {
  const [rating, setRating] = React.useState(0);
  const [location, setLocation] = React.useState(pickUpLocation);
  const [selected, setSelected] = React.useState("pickup");
  const [locationName, setLocationName] = React.useState("");

  useEffect(() => {
    const updateLocation = async () => {
      const locationDetails = await fetchLocationDetails({
        lat: location.latitude,
        lng: location.longitude,
      });
      const locationDescription = (locationDetails as { description?: string })?.description;

      setLocationName(locationDescription ?? "Undefined");
    };
    updateLocation();
  }, [location]);

  useEffect(() => {
    setRating(calculateAverageRating(ratings));
  }, [ratings]);

  console.log("activities", activities);
  const timelineData: TimelineItem[] = activities.map((activity, index) => {
    return {
      location: activity,
      duration: durationOfActivities[index],
    };
  });

  return (
    <div className="px-32 py-4">
      <h1 className="text-3xl font-semibold ">{name}</h1>

      {/* Rating */}
      <div className="flex justify-between mb-4">
        <div className="flex gap-0.5 text-sm items-center">
          <Star className={"w-4 h-4 fill-[var(--primary-color)] text-[var(--primary-color)]"} />
          <h6 className="w-4 h-4 ">{rating.toFixed(1)}</h6>
          <h6 className="ml-1 mt-1">({ratings.length})</h6>
        </div>
        <div className="flex">
          <SharePopover link={window.location.href} size={18} shareText={true} />
          <Bookmark />
        </div>
      </div>

      {/* Image Gallery */}
      <ImageGallery images={images} />

      {/* Tags */}
      <div className="flex space-x-2 py-3">
        {preferenceTagNames.map((tag, index) => (
          <div
            key={index}
            className={"flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"}
          >
            <Tag className="w-4 h-4 mr-1" />
            {tag}
          </div>
        ))}
        {/* Accessibility */}
        <div
          className={"flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"}
        >
          {accessibility}
        </div>
      </div>

      {/* Horizontal line */}
      <hr className="border-t border-gray-200" />
      <div className="grid grid-cols-3 gap-8 px-2 py-5">
        <div className="space-y-6 col-span-2">
          {/* Author and Description */}
          <div className="space-y-4">
            <p className="font-medium text-lg">{`Itinerary hosted by ${ownerName}`}</p>
            <div className="flex items-center gap-2">
              {/* languages */}
              <p className="text-gray-600">presented in: </p>
              {languages.map((language, index) => (
                <div
                  key={index}
                  className={
                    "flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                  }
                >
                  <TbWorld className="w-4 h-4 mr-1" />
                  {capitalizeFirstLetter(language)}
                </div>
              ))}
            </div>
          </div>
          <hr className="border-t border-gray-200" />
          <p className="font-medium text-lg">What you'll be doing</p>
          <p className="text-gray-600">{description}</p>

          <hr className="border-t border-gray-200" />
          <div className="flex justify-between">
            <p className="font-medium text-lg">Location</p>
            <LocationToggle
              selected={selected}
              setSelected={setSelected}
              setLocation={setLocation}
              pickUpLocation={pickUpLocation}
              dropOffLocation={dropOffLocation}
            />
          </div>
          <GoogleMap
            isEditable={false}
            location={{ lat: location.latitude, lng: location.longitude }}
            setLocation={() => {}}
            className="rounded-full"
          />
          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            <p className="mt-1">{locationName}</p>
          </div>
          <hr className="border-t border-gray-200" />
          {/* Timeline */}
          <div className="space-y-4">
            <p className="font-medium text-lg">Timeline</p>
            <Timeline timelineData={timelineData} />
          </div>
        </div>

        {/* Right Column - Booking Card */}
        <div className="justify-center items-center ">{children}</div>
      </div>
      {/* Horizontal line */}
      <hr className="border-t border-gray-200" />
      {/* Reviews */}
      <h2 className="text-xl font-semibold mt-4">Reviews</h2>
      <Review reviews={ratings} />
    </div>
  );
}
