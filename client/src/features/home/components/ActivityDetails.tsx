import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star } from 'lucide-react';
import Reviews from './Reviews';
import LocationMap from '@/components/google-maps/LocationMap';
import GoogleMap from '@/components/google-maps/GoogleMap';
import { IoMdPricetag } from 'react-icons/io';
import SharePopover from '@/components/SharePopover';

interface ActivityImage {
  src: string;
  alt: string;
}

interface AvailableDate {
  date: string;
  time: string;
}

interface ActivityDetailsProps {
  images: ActivityImage[];
  title: string;
  rating: number;
  price: number;
  description: string;
  author: string;
  availableDates: AvailableDate[];
}

const ActivityDetailsPage: React.FC<ActivityDetailsProps> = ({
  images = [
    { src: '/api/placeholder/400/300', alt: 'Snow park slide' },
    { src: '/api/placeholder/400/300', alt: 'Pink lit snow park' },
    { src: '/api/placeholder/400/300', alt: 'Snow globe' },
    { src: '/api/placeholder/400/300', alt: 'Snow activities' },
    { src: '/api/placeholder/400/300', alt: 'Snow park structure' }
  ],
  title = "Cairo City Tour",
  rating = 5,
  price = 200,
  description = "Spread over 22,000 square meters, our Snow Park caters to all ages. With 7,000 tons of snow spread across the Snow Park, and a variety of rides from the exciting Snake & Bumpy rides and Zorb ball, to the more thrilling Bobsled, run and Snow Rocket, all range from fun to Extremely Fun! Making sure you'll enjoy a unique experience at the largest indoor Snow Park in the region.",
  author = "Majid AlFutaim",
  availableDates = [
    { date: "20th October", time: "8AM" },
    { date: "21st October", time: "10AM" },
    { date: "22nd November", time: "11AM" }
  ]
}) => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Images and Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{title}</h1>
          <SharePopover link="https://rahhal.com" />
          {/* Rating */}
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <img
                src={images[0].src}
                alt={images[0].alt}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            {images.slice(1).map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex space-x-2">
          
            <span className="flex space-x-2 px-3 py-1 bg-gray-100 rounded-full text-sm">
            <IoMdPricetag /> fun.family.fitness
            </span>
          </div>

          {/* Author and Description */}
          <div className="space-y-4">
            <p className="font-semibold">By: {author}</p>
            <p className="text-gray-600">{description}</p>
          </div>
          <GoogleMap isEditable={false} location={{ lat: 30.0444, lng: 31.2357 }} setLocation={() => {}} />
          {/* Reviews */}
          <Reviews />
        </div>

        {/* Right Column - Booking Card */}
        <div>
          <Card className="sticky top-6">
            <CardContent className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Total:</h2>
                <span className="text-xl">EGP {price}</span>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Select Your Desired Date</h3>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Value" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDates.map((date, index) => (
                      <SelectItem key={index} value={`${date.date} ${date.time}`}>
                        {date.date} {date.time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
                Book Itinerary
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailsPage;