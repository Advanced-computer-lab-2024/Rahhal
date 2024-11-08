import { HotelIcon, MapPin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SharePopover from "@/components/SharePopover";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import ReservationDetails from "./ReservationDetails";
import { addDays, format, isSameMonth, isSameDay, startOfToday, differenceInDays } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { HotelDetailsProps } from "@/features/home/types/home-page-types";



export default function HotelDetails({ hotel }: HotelDetailsProps) {
  const [date, setDate] = useState<DateRange>({
    from: startOfToday(),
    to: addDays(startOfToday(), 7),
  });
  const ratingParsed = parseFloat(hotel.rating.ratingValue);
  const chunkArray = (arr: { text: string; svg: string }[], size: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const [showMoreProperty, setShowMoreProperty] = useState(false);
  const [showMoreFeat, setShowMoreFeat] = useState(false);
  const [showMoreType, setShowMoreType] = useState(false);

  const propertyAmenities = chunkArray(hotel.features.propertyAmenities, 2);
  const roomFeatures = chunkArray(hotel.features.roomFeatures, 2);
  const roomTypes = chunkArray(hotel.features.roomTypes, 2);

  return (
    <div className="py-8 px-[20%]">
      <div className="flex flex-col gap-2">
        <span className="text-4xl font-semibold">{hotel.name}</span>
        <div className="flex items-center gap-2 px-1">
          <div className="h-4 w-16 flex items-center">
            <svg
              dangerouslySetInnerHTML={{ __html: decodeURI(hotel.bubbleRating) }}
              className="w-full h-full"
              viewBox="0 0 132 24"
              fill="var(--primary-color)"
            ></svg>
          </div>
          <span className="text-sm text-gray-600">{hotel.rating.reviewCount} reviews</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span className="pb-0.5">
            {hotel.address.streetAddress}, {hotel.address.addressLocality}{" "}
            {hotel.address.postalCode} {hotel.address.addressCountry.name}{" "}
          </span>
        </div>
        <div className="flex flex-col gap-12">
          <div className="w-full h-[30rem] border-2 border-color-gray-200 rounded-2xl flex overflow-hidden">
            <div className="relative group h-[30rem] flex justify-center w-8/12">
              <Carousel className="w-full h-full">
                <CarouselContent className="w-full h-full ml-0">
                  {hotel.images.map((image, index) => (
                    <CarouselItem key={index} className=" h-full w-full pl-0">
                      <img
                        src={image}
                        alt={hotel.name}
                        className=" w-full h-[29.75rem] object-cover"
                      />
                    </CarouselItem>
                  ))}
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
                <span className="text-left font-semibold">{hotel.averagePrice} </span>{" "}
                <span className="pl-1 ">night</span>
              </div>
              <div>
                <ReservationDetails date={date} setDate={setDate} />
              </div>
              <button className="bg-[var(--primary-color)] hover:bg-[var(--primary-color-dark)] rounded-lg text-white p-2 text-sm w-64 h-12">
                Reserve
              </button>
              <div className="flex flex-col justify-end items-center w-4/12 gap-3 h-44">
                {date.to && (
                  <>
                    <div className="flex justify-between w-64 px-4">
                      {date.to && (
                        <>
                          <span className="underline">
                            {hotel.averagePrice +
                              " x " +
                              differenceInDays(date.to, date.from!) +
                              " nights"}
                          </span>
                          <span>
                            {differenceInDays(date.to, date.from!) *
                              parseInt(hotel.averagePrice.slice(1))}
                          </span>
                        </>
                      )}
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
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="w-full h-fit border-2 border-color-gray-200 rounded-2xl flex overflow-hidden p-5 flex-col">
            <span className="text-3xl font-medium">About</span>
            <hr className="border-1 border-gray-300 my-4" />
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-6">
                <div className="flex">
                  <span className="text-5xl font-medium">{hotel.rating.ratingValue}</span>
                  <div className="flex flex-col px-2">
                    <span className="font-medium">
                      {ratingParsed > 4
                        ? "Excellent"
                        : ratingParsed > 3
                          ? "Very good"
                          : ratingParsed > 2
                            ? "Average"
                            : ratingParsed > 1
                              ? "Poor"
                              : "Terrible"}
                    </span>
                    <div className="flex justify-start gap-2">
                      <svg
                        dangerouslySetInnerHTML={{ __html: decodeURI(hotel.bubbleRating) }}
                        className="h-5"
                        viewBox="0 0 132 24"
                        fill="var(--primary-color)"
                      />
                      <span> {hotel.rating.reviewCount + " "}reviews</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {hotel.ratings.map(({ name, rate }) => (
                    <div className="flex justify-start gap-7 items-center">
                      <span className="w-32">{name}</span>
                      <div className="w-24 h-3 bg-gray-200 rounded-2xl">
                        <div
                          className={` h-full bg-[var(--primary-color)] rounded-2xl`}
                          style={{ width: `${(rate / 5.0) * 100}%` }}
                        ></div>
                      </div>
                      <span>{rate}</span>
                    </div>
                  ))}
                </div>
                <hr className="border-1 border-gray-300 my-4" />
                <span>{hotel.description}</span>
                <hr className="border-1 border-gray-300 my-4" />
              </div>

              <div className="flex flex-col py-3 gap-4">
                <span className="font-medium text-md">Property amenities</span>
                {!showMoreProperty && propertyAmenities.length > 4 && (
                  <>
                    {propertyAmenities.slice(0, 4).map((arr) => (
                      <div className="flex justify-between">
                        <div className="flex justify-start gap-2 w-1/2">
                          <svg
                            dangerouslySetInnerHTML={{ __html: decodeURI(arr[0].svg) }}
                            className="h-5"
                            viewBox="0 0 24 24"
                          />
                          <span className="text-sm text-gray-700">{arr[0].text}</span>
                        </div>
                        {arr[1] && (
                          <div className="flex justify-start gap-2 w-1/2">
                            <svg
                              dangerouslySetInnerHTML={{ __html: decodeURI(arr[1].svg) }}
                              className="h-5"
                              viewBox="0 0 24 24"
                            />
                            <span className="text-sm text-gray-700">{arr[1].text}</span>
                          </div>
                        )}
                      </div>
                    ))}
                    <span className="flex gap-2 mb-4">
                      {" "}
                      <button
                        onClick={() => setShowMoreProperty(true)}
                        className="underline font-semibold"
                      >
                        Show more
                      </button>{" "}
                      <ChevronDown
                        onClick={() => setShowMoreProperty(true)}
                        className="hover:cursor-pointer"
                      />
                    </span>{" "}
                  </>
                )}

                {showMoreProperty && (
                  <>
                    {propertyAmenities.map((arr) => (
                      <div className="flex justify-between">
                        <div className="flex justify-start gap-2 w-1/2">
                          <svg
                            dangerouslySetInnerHTML={{ __html: decodeURI(arr[0].svg) }}
                            className="h-5"
                            viewBox="0 0 24 24"
                          />
                          <span className="text-sm text-gray-700">{arr[0].text}</span>
                        </div>
                        {arr[1] && (
                          <div className="flex justify-start gap-2 w-1/2">
                            <svg
                              dangerouslySetInnerHTML={{ __html: decodeURI(arr[1].svg) }}
                              className="h-5"
                              viewBox="0 0 24 24"
                            />
                            <span className="text-sm text-gray-700">{arr[1].text}</span>
                          </div>
                        )}
                      </div>
                    ))}
                    {propertyAmenities.length > 4 && (
                      <span className="flex gap-2 mb-4">
                        {" "}
                        <button
                          onClick={() => setShowMoreProperty(false)}
                          className="underline font-semibold"
                        >
                          Show less
                        </button>{" "}
                        <ChevronUp
                          onClick={() => setShowMoreProperty(false)}
                          className="hover:cursor-pointer"
                        />
                      </span>
                    )}{" "}
                  </>
                )}

                <span className="font-medium text-md">Room features</span>
                {!showMoreFeat && roomFeatures.length > 4 && (
                  <>
                    {roomFeatures.slice(0, 4).map((arr) => (
                      <div className="flex justify-between">
                        <div className="flex justify-start gap-2 w-1/2">
                          <svg
                            dangerouslySetInnerHTML={{ __html: decodeURI(arr[0].svg) }}
                            className="h-5"
                            viewBox="0 0 24 24"
                          />
                          <span className="text-sm text-gray-700">{arr[0].text}</span>
                        </div>
                        {arr[1] && (
                          <div className="flex justify-start gap-2 w-1/2">
                            <svg
                              dangerouslySetInnerHTML={{ __html: decodeURI(arr[1].svg) }}
                              className="h-5"
                              viewBox="0 0 24 24"
                            />
                            <span className="text-sm text-gray-700">{arr[1].text}</span>
                          </div>
                        )}
                      </div>
                    ))}
                    <span className="flex gap-2 mb-4">
                      {" "}
                      <button
                        onClick={() => setShowMoreFeat(true)}
                        className="underline font-semibold"
                      >
                        Show more
                      </button>{" "}
                      <ChevronDown
                        onClick={() => setShowMoreFeat(true)}
                        className="hover:cursor-pointer"
                      />
                    </span>{" "}
                  </>
                )}

                {showMoreFeat && (
                  <>
                    {roomFeatures.map((arr) => (
                      <div className="flex justify-between">
                        <div className="flex justify-start gap-2 w-1/2">
                          <svg
                            dangerouslySetInnerHTML={{ __html: decodeURI(arr[0].svg) }}
                            className="h-5"
                            viewBox="0 0 24 24"
                          />
                          <span className="text-sm text-gray-700">{arr[0].text}</span>
                        </div>
                        {arr[1] && (
                          <div className="flex justify-start gap-2 w-1/2">
                            <svg
                              dangerouslySetInnerHTML={{ __html: decodeURI(arr[1].svg) }}
                              className="h-5"
                              viewBox="0 0 24 24"
                            />
                            <span className="text-sm text-gray-700">{arr[1].text}</span>
                          </div>
                        )}
                      </div>
                    ))}
                    {roomFeatures.length > 4 && (
                      <span className="flex gap-2 mb-4">
                        {" "}
                        <button
                          onClick={() => setShowMoreFeat(false)}
                          className="underline font-semibold"
                        >
                          Show less
                        </button>{" "}
                        <ChevronUp
                          onClick={() => setShowMoreFeat(false)}
                          className="hover:cursor-pointer"
                        />
                      </span>
                    )}{" "}
                  </>
                )}

                <span className="font-medium text-md">Room types</span>
                {!showMoreType && roomTypes.length > 4 && (
                  <>
                    {roomTypes.slice(0, 4).map((arr) => (
                      <div className="flex justify-between">
                        <div className="flex justify-start gap-2 w-1/2">
                          <svg
                            dangerouslySetInnerHTML={{ __html: decodeURI(arr[0].svg) }}
                            className="h-5"
                            viewBox="0 0 24 24"
                          />
                          <span className="text-sm text-gray-700">{arr[0].text}</span>
                        </div>
                        {arr[1] && (
                          <div className="flex justify-start gap-2 w-1/2">
                            <svg
                              dangerouslySetInnerHTML={{ __html: decodeURI(arr[1].svg) }}
                              className="h-5"
                              viewBox="0 0 24 24"
                            />
                            <span className="text-sm text-gray-700">{arr[1].text}</span>
                          </div>
                        )}
                      </div>
                    ))}
                    <span className="flex gap-2 mb-4">
                      {" "}
                      <button
                        onClick={() => setShowMoreType(true)}
                        className="underline font-semibold"
                      >
                        Show more
                      </button>{" "}
                      <ChevronDown
                        onClick={() => setShowMoreType(true)}
                        className="hover:cursor-pointer"
                      />
                    </span>{" "}
                  </>
                )}

                {(showMoreFeat || roomTypes.length <= 4) && (
                  <>
                    {roomTypes.map((arr) => (
                      <div className="flex justify-between">
                        <div className="flex justify-start gap-2 w-1/2">
                          <svg
                            dangerouslySetInnerHTML={{ __html: decodeURI(arr[0].svg) }}
                            className="h-5"
                            viewBox="0 0 24 24"
                          />
                          <span className="text-sm text-gray-700">{arr[0].text}</span>
                        </div>
                        {arr[1] && (
                          <div className="flex justify-start gap-2 w-1/2">
                            <svg
                              dangerouslySetInnerHTML={{ __html: decodeURI(arr[1].svg) }}
                              className="h-5"
                              viewBox="0 0 24 24"
                            />
                            <span className="text-sm text-gray-700">{arr[1].text}</span>
                          </div>
                        )}
                      </div>
                    ))}
                    {roomTypes.length > 4 && (
                      <span className="flex gap-2 mb-4">
                        {" "}
                        <button
                          onClick={() => setShowMoreType(false)}
                          className="underline font-semibold"
                        >
                          Show less
                        </button>{" "}
                        <ChevronUp
                          onClick={() => setShowMoreType(false)}
                          className="hover:cursor-pointer"
                        />
                      </span>
                    )}{" "}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
