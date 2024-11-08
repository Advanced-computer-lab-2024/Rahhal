import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { HotelDetailsProps } from "@/features/home/types/home-page-types";


export default function HotelCard({hotel}: HotelDetailsProps) {


    return (
        <div className="rounded-md border w-64 h-[24rem]  border-gray-300">
            <div className="relative group h-60 flex justify-center w-full">
                <Carousel className="w-full h-full">
                    <CarouselContent className="w-full h-full ml-0">
                        {
                            hotel.images.map((image, index) => (
                                <CarouselItem key={index} className=" h-full w-full p-2">
                                    <img src={image} alt={hotel.name} className="rounded-md w-full h-60 object-cover" />
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>

                    <CarouselPrevious className="group bg-transparent border-0 rounded-full bg-gray-300 bg-opacity-50 translate-x-[250%] h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <CarouselNext className="group bg-transparent border-0 rounded-full bg-gray-300 bg-opacity-50 translate-x-[-250%] h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Carousel>
            </div>

            <div className="flex flex-col p-2 pt-4 pb-1">
                <span className="text-lg font-semibold">{hotel.name}</span>
                <div className="flex justify-start items-center gap-2">
                    <div className="h-4 w-16 flex items-center">
                        <svg
                            fill="var(--primary-color)"
                            viewBox="0 0 132 24"
                            className="w-full h-full"
                            dangerouslySetInnerHTML={{ __html: decodeURI(hotel.bubbleRating) }}
                        />
                    </div>
                    <span className="text-sm text-gray-600">{hotel.rating.reviewCount}</span>
                </div>
            </div>

            <div className="flex items-end justify-between p-2">

                <div className="flex flex-col">
                    <span className="text-gray-600"> from </span>
                    <div><span className="text-lg font-semibold"> {hotel.averagePrice} </span> <span className="text-gray-600">/night</span></div>
                </div>

                <div>
                    <button className="bg-[var(--primary-color)] hover:bg-[var(--primary-color-dark)] rounded-sm p-2 text-sm">
                        Reserve Room
                    </button> </div>

            </div>

        </div>
    )
}