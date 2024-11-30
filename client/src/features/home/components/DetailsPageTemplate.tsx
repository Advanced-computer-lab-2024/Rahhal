import GoogleMap from "@/components/google-maps/GoogleMap";
import SharePopover from "@/components/SharePopover";
import { MapPin, Star, Tag } from "lucide-react";
import React, { useEffect, useState } from "react";
import Review from "./Reviews";
import {
  calculateAverageRating,
  TRating,
} from "@/features/admin/utils/columns-definitions/activities-columns";
import { fetchLocationDetails } from "@/api-calls/google-maps-api-calls";
import ImageGallery from "./ImageGallery";
import Bookmark from "./bookmarks/Bookmark";
import { bookmarkType } from "@/utils/enums";

interface DetailsPageTemplateProps {
  _id: string;
  name: string;
  ownerName: string;
  images: string[];
  description: string;
  location: { longitude: number; latitude: number };
  preferenceTagNames: string[];
  ratings: TRating[];
  children: React.ReactNode;
}

export default function DetailsPageTemplate({
  _id,
  name,
  ownerName,
  images,
  description,
  location,
  preferenceTagNames,
  ratings,
  children,
}: DetailsPageTemplateProps) {
  const [rating, setRating] = React.useState(0);
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
  }, [locationName]);

  useEffect(() => {
    setRating(calculateAverageRating(ratings));
  }, [ratings]);

  return (
    <div className="px-32 py-4">
      <h1 className="text-3xl font-semibold mb-2 ">{name}</h1>

      {/* Rating */}
      <div className="flex justify-between mb-4">
        <div className="flex gap-0.5 text-sm items-center">
          <Star className={"w-4 h-4 fill-[var(--primary-color)] text-[var(--primary-color)]"} />
          <h6 className="w-4 h-4 ">{rating.toFixed(1)}</h6>
          <h6 className="ml-1 mt-1">({ratings.length})</h6>
        </div>
        <div className="flex">
          <SharePopover link={window.location.href} size={18} shareText={true} />
          <Bookmark id={_id} bookmarkType={bookmarkType.Activity} />
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
      </div>

      {/* Horizontal line */}
      <hr className="border-t border-gray-200" />

      <div className="grid grid-cols-3 gap-8 px-2 py-5">
        <div className="space-y-6 col-span-2">
          {/* Author and Description */}
          <div className="space-y-4">
            <p className="font-medium">By: {ownerName}</p>
            <p className="text-gray-600">{description}</p>
          </div>
          <hr className="border-t border-gray-200" />
          <p className="font-medium text-lg">Where you can find us</p>
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
