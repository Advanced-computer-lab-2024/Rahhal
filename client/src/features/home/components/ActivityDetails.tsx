import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, Tag } from "lucide-react";
import Reviews from "./Reviews";
import LocationMap from "@/components/google-maps/LocationMap";
import GoogleMap from "@/components/google-maps/GoogleMap";
import { IoMdPricetag } from "react-icons/io";
import SharePopover from "@/components/SharePopover";
import TouristHomePageNavigation from "./TouristHomePageNavigation";
import { OverviewCard } from "./overview-card/OverViewCard";
import { TActivity } from "@/features/advertiser/utils/advertiser-columns";
import { calculateAverageRating } from "@/features/admin/utils/columns-definitions/activities-columns";
import { TBookingStatus } from "../types/home-page-types";



interface ActivityDetailsProps {
 activity: TActivity;
 status: TBookingStatus;
}

const ActivityDetailsPage: React.FC<ActivityDetailsProps> = ({ activity, status }) => {

  const [rating, setRating] = React.useState(0);

  React.useEffect(() => {
    
    setRating(calculateAverageRating(activity.ratings));
    
  }, [activity.ratings]);

  const {
    name,
    images,
    owner,
    description,
    tags,
    location,
    date,
    price,
    ratings,
  } = activity;

  const activityDate = new Date(date);
  const formattedDate = activityDate.getDate() + "/" + (activityDate.getMonth() + 1) + "/" + activityDate.getFullYear();
  const formattedTime = ((activityDate.getHours() % 12) <= 9) ? "0" + (activityDate.getHours() % 12) + ":" + ((activityDate.getMinutes() <= 9) ? "0" + activityDate.getMinutes() : activityDate.getMinutes()) + " " + ((activityDate.getHours() < 12) ? "AM" : "PM") : (activityDate.getHours() % 12) + ":" + ((activityDate.getMinutes() <= 9) ? "0" + activityDate.getMinutes() : activityDate.getMinutes()) + " " + ((activityDate.getHours() < 12) ? "AM" : "PM");

  return (
    <div>
      
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Images and Details */}
        <div className="space-y-6 col-span-2">
          <h1 className="text-3xl font-bold">{name}</h1>
          <SharePopover link="https://rahhal.com" />
          {/* Rating */}
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src={images[0]}
              
              className="w-full h-full object-cover rounded-lg"
            />

            <div className="grid grid-cols-2 gap-2">
              {images.slice(1).map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex space-x-2">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{tags.map((tag) => tag.name)}</span>
          </div>

          {/* Author and Description */}
          <div className="space-y-4">
            <p className="font-semibold">By: {owner}</p>
            <p className="text-gray-600">{description}</p>
          </div>
          <GoogleMap
            isEditable={false}
            location={{ lat: 30.0444, lng: 31.2357 }}
            setLocation={() => {}}
          />
          {/* Reviews */}
          <Reviews />
        </div>

        {/* Right Column - Booking Card */}
        <div className="justify-center items-center">
          <OverviewCard originalPrice={price.amount} buttonText={(status === "cancelled") ? "Cancel Activity" : "Review Activity" } buttonColor={ (status === "cancelled") ? "red" : "gold" } date={formattedDate} time={formattedTime} />
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailsPage;
