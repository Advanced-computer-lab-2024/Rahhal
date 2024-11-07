import { MapPin } from 'lucide-react';

interface HotelDetails {
    name: string,
    address:{
        "@type":string,
        streetAddress:string,
        addressLocality:string,
        postalCode:string,
        addressCountry:{
            "@type":string,
            name:string
        }
    },
    rating:{
        "@type":string,
        ratingValue:string,
        reviewCount:number
    },
    mainImage:string,
    description:string,
    features:{
        propertyAmenities:{text:string,svg:string}[],
        roomFeatures:{text:string,svg:string}[],
        roomTypes:{text:string,svg:string}[]
    },
    averagePrice:string,
    images:string[],
    bubbleRating:string,
    ratings:{ name: string; rate: number; }[]
}

export interface HotelDetailsProps {
    hotel: HotelDetails;
}



export default function HotelDetails( {hotel} : HotelDetailsProps) {
    
    return (
        <div className="py-8 px-96">

            <div className="flex flex-col gap-2">
            <span className="text-4xl font-semibold">{hotel.name}</span>
            <div className="flex items-center gap-2 px-1">

                <div className="h-4 w-16 flex items-center">
                <svg dangerouslySetInnerHTML={{__html: decodeURI(hotel.bubbleRating)}} className="w-full h-full" viewBox="0 0 132 24" fill="var(--primary-color)"></svg>
                </div>
                <span className="text-sm text-gray-600">{hotel.rating.reviewCount} reviews</span>
            </div>
            <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> 
                <span className="pb-0.5">{hotel.address.streetAddress}, {hotel.address.addressLocality} {hotel.address.postalCode} {hotel.address.addressCountry.name} </span>
            </div>

            <div className="w-full h-[30rem] border-2 border-color-gray-200 rounded-2xl">
            </div>

        </div>
            
        </div>
        
    )

}