import { HotelIcon, MapPin } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import SharePopover from '@/components/SharePopover';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import ReservationDetails from './ReservationDetails';
import { addDays, format, isSameMonth, isSameDay, startOfToday, differenceInDays } from "date-fns"
interface HotelDetails {
    name: string,
    address: {
        "@type": string,
        streetAddress: string,
        addressLocality: string,
        postalCode: string,
        addressCountry: {
            "@type": string,
            name: string
        }
    },
    rating: {
        "@type": string,
        ratingValue: string,
        reviewCount: number
    },
    mainImage: string,
    description: string,
    features: {
        propertyAmenities: { text: string, svg: string }[],
        roomFeatures: { text: string, svg: string }[],
        roomTypes: { text: string, svg: string }[]
    },
    averagePrice: string,
    images: string[],
    bubbleRating: string,
    ratings: { name: string; rate: number; }[]
}

export interface HotelDetailsProps {
    hotel: HotelDetails;
}


export default function HotelDetails({ hotel }: HotelDetailsProps) {
    const [date, setDate] = useState<DateRange>({
        from: startOfToday(),
        to: addDays(startOfToday(), 7),
    })
    const ratingParsed = parseFloat(hotel.rating.ratingValue);
    const chunkArray = (arr: { text: string, svg: string }[], size: number) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    const propertyAmenities = chunkArray(hotel.features.propertyAmenities, 2);
    const roomFeatures = chunkArray(hotel.features.roomFeatures, 2);
    const roomTypes = chunkArray(hotel.features.roomTypes, 2);

    return (
        <div className="py-8 px-[20%]">

            <div className="flex flex-col gap-2">
                <span className="text-4xl font-semibold">{hotel.name}</span>
                <div className="flex items-center gap-2 px-1">

                    <div className="h-4 w-16 flex items-center">
                        <svg dangerouslySetInnerHTML={{ __html: decodeURI(hotel.bubbleRating) }} className="w-full h-full" viewBox="0 0 132 24" fill="var(--primary-color)"></svg>
                    </div>
                    <span className="text-sm text-gray-600">{hotel.rating.reviewCount} reviews</span>
                </div>
                <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span className="pb-0.5">{hotel.address.streetAddress}, {hotel.address.addressLocality} {hotel.address.postalCode} {hotel.address.addressCountry.name} </span>
                </div>
                <div className="flex flex-col gap-12">
                    <div className="w-full h-[30rem] border-2 border-color-gray-200 rounded-2xl flex overflow-hidden">

                        <div className="relative group h-[30rem] flex justify-center w-8/12">
                            <Carousel className="w-full h-full">
                                <CarouselContent className="w-full h-full ml-0">
                                    {
                                        hotel.images.map((image, index) => (
                                            <CarouselItem key={index} className=" h-full w-full pl-0">
                                                <img src={image} alt={hotel.name} className=" w-full h-[29.75rem] object-cover" />
                                            </CarouselItem>
                                        ))
                                    }
                                </CarouselContent>

                                <CarouselPrevious className="group bg-transparent border-0 rounded-full bg-gray-300 bg-opacity-50 translate-x-[250%] h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-0 disabled:group-hover:opacity-0" />

                                <CarouselNext className="group bg-transparent border-0 rounded-full bg-gray-300 bg-opacity-50 translate-x-[-250%] h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-0 disabled:group-hover:opacity-0" />
                            </Carousel>
                        </div>
                        <div className="flex flex-col justify-end pb-5 items-center w-4/12 gap-3">
                            <div className="flex justify-end w-full pr-4">
                                <SharePopover link={""} />
                            </div>
                
                            <div className="flex justify-start w-64 p-2">
                                <span className="text-left font-semibold">{hotel.averagePrice} </span> <span className="pl-1 ">night</span>
                            </div>
                            <div>
                                <ReservationDetails date={date} setDate={setDate} />
                            </div>
                            <button className="bg-[var(--primary-color)] hover:bg-[var(--primary-color-dark)] rounded-lg text-white p-2 text-sm w-64 h-12">
                                Reserve
                            </button>
                            <div className="flex flex-col justify-end items-center w-4/12 gap-3 h-44">
                                {
                                    date.to && (
                                        <>
                                            <div className="flex justify-between w-64 px-4">
                                                {date.to && (<><span className="underline">{hotel.averagePrice + " x " + differenceInDays(date.to, date.from!) + " nights"}</span>
                                                    <span >{differenceInDays(date.to, date.from!) * parseInt(hotel.averagePrice.slice(1))}</span></>)}
                                            </div>
                                            <div>
                                                <div className="flex justify-between w-64 px-4">
                                                    <span className="underline"> Cleaning fee </span>
                                                    <span> 500 </span>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex justify-between w-64 px-4">
                                                    <span className="underline"> Rahhal service fee </span>
                                                    <span> 400 </span>
                                                </div>
                                            </div>
                                            <hr className="border-1 border-gray-300 w-60" />
                                            <div>
                                                <div className="flex justify-between w-64 px-4">
                                                    <span className="font-medium"> Total </span>
                                                    <span> 1400 </span>
                                                </div>
                                            </div>

                                        </>)
                                }
                            </div>

                        </div>

                    </div>

                    <div className="w-full h-fit border-2 border-color-gray-200 rounded-2xl flex overflow-hidden p-5 flex-col">
                        <span className="text-3xl font-medium">About</span>
                        <hr className="border-1 border-gray-300 my-4" />
                        <div className="grid grid-cols-2 gap-6">

                            <div className="flex flex-col gap-6">
                                <div className="flex">
                                    <span className="text-5xl font-medium">
                                        {hotel.rating.ratingValue}
                                    </span>
                                    <div className="flex flex-col px-2">
                                        <span className="font-medium">{ratingParsed > 4 ? "Excellent" : ratingParsed > 3 ? "Very good" : ratingParsed > 2 ? "Average" : ratingParsed > 1 ? "Poor" : "Terrible"}</span>
                                        <div className="flex justify-start gap-2">
                                            <svg
                                                dangerouslySetInnerHTML={{ __html: decodeURI(hotel.bubbleRating) }}
                                                className="h-5" viewBox="0 0 132 24" fill="var(--primary-color)"
                                            />
                                            <span > {hotel.rating.reviewCount + " "}reviews</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {


                                        hotel.ratings.map(({ name, rate }) => (

                                            <div className="flex justify-start gap-7 items-center">
                                                <span className="w-32">{name}</span>
                                                <div className="w-24 h-3 bg-gray-200 rounded-2xl">
                                                    <div className={` h-full bg-[var(--primary-color)] rounded-2xl`} style={{ width: `${(rate / 5.0) * 100}%` }}></div>
                                                </div>
                                                <span>{rate}</span>
                                            </div>

                                        ))


                                    }
                                </div>
                                <hr className="border-1 border-gray-300 my-4" />
                                <span>{hotel.description}</span>
                                <hr className="border-1 border-gray-300 my-4" />
                                <div className="flex flex-col py-3 gap-4">
                                <span className="font-medium text-md">Room features</span>
                                {
                                    roomFeatures.map((arr) => (

                                        <div className="flex justify-between">
                                            <div className="flex justify-start gap-2 w-1/2">
                                                <svg dangerouslySetInnerHTML={{ __html: decodeURI(arr[0].svg) }} className="h-5" viewBox="0 0 24 24" />
                                                <span className="text-sm text-gray-700">{arr[0].text}</span>
                                            </div>
                                            {arr[1] && <div className="flex justify-start gap-2 w-1/2">
                                                <svg dangerouslySetInnerHTML={{ __html: decodeURI(arr[1].svg) }} className="h-5" viewBox="0 0 24 24" />
                                                <span className="text-sm text-gray-700">{arr[1].text}</span>
                                            </div>}
                                        </div>
                                    ))
                                }
                                </div>
                            </div>

                            <div className="flex flex-col py-3 gap-4">
                                <span className="font-medium text-md">Property amenities</span>
                                {
                                    propertyAmenities.map((arr) => (

                                        <div className="flex justify-between">
                                            <div className="flex justify-start gap-2 w-1/2">
                                                <svg dangerouslySetInnerHTML={{ __html: decodeURI(arr[0].svg) }} className="h-5" viewBox="0 0 24 24" />
                                                <span className="text-sm text-gray-700">{arr[0].text}</span>
                                            </div>
                                            {arr[1] && <div className="flex justify-start gap-2 w-1/2">
                                                <svg dangerouslySetInnerHTML={{ __html: decodeURI(arr[1].svg) }} className="h-5" viewBox="0 0 24 24" />
                                                <span className="text-sm text-gray-700">{arr[1].text}</span>
                                            </div>}
                                        </div>
                                    ))
                                }

                                <span className="font-medium text-md mt-5">Room types</span>
                                {
                                    roomTypes.map((arr) => (

                                        <div className="flex justify-between">
                                            <div className="flex justify-start gap-2 w-1/2">
                                                <svg dangerouslySetInnerHTML={{ __html: decodeURI(arr[0].svg) }} className="h-5" viewBox="0 0 24 24" />
                                                <span className="text-sm text-gray-700">{arr[0].text}</span>
                                            </div>
                                            {arr[1] && <div className="flex justify-start gap-2 w-1/2">
                                                <svg dangerouslySetInnerHTML={{ __html: decodeURI(arr[1].svg) }} className="h-5" viewBox="0 0 24 24" />
                                                <span className="text-sm text-gray-700">{arr[1].text}</span>
                                            </div>}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )

}