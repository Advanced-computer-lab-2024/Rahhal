import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { IHotelDetails } from "@/features/home/types/home-page-types";
import {currencyExchangeSpec} from "@/utils/currency-exchange";
import { useRatesStore, useCurrencyStore } from "@/stores/currency-exchange-store";
import { Link, useParams } from "react-router-dom"

interface HotelCardProps{
    hotel:IHotelDetails
    index:number
}   

export default function HotelCard({ hotel , index}: HotelCardProps) {
    const { rates } = useRatesStore();
    const { currency } = useCurrencyStore();
    const { id } = useParams();
    return (
        <div className="rounded-md border w-64 h-[27rem] flex justify-between flex-col p-1 border-gray-300">
            <div className="flex flex-col">
            <div className="relative group h-60 flex justify-center w-full">
                <Carousel className="w-full h-full ">
                    <CarouselContent className="w-full h-full ml-0 ">
                        {
                            hotel.images.map((image, index) => (
                                <CarouselItem key={index} className=" h-full w-full pl-0">
                                    <img src={image} alt={hotel.name} className="rounded-md w-full h-60 object-cover" />
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>

                    <CarouselPrevious className="group bg-transparent border-0 rounded-full bg-gray-300 bg-opacity-50 translate-x-[250%] h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-0 disabled:group-hover:opacity-0" />

                    <CarouselNext className="group bg-transparent border-0 rounded-full bg-gray-300 bg-opacity-50 translate-x-[-250%] h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-0 disabled:group-hover:opacity-0"/>
                </Carousel>
            </div>

            <div className="flex flex-col p-2 pt-4 pb-1">
                <span className="text-md font-semibold">{hotel.name}</span>
                <div className="flex justify-start items-center gap-2">
                    <div className="h-4 w-16 flex items-center">
                        <svg
                            fill="var(--primary-color)"
                            viewBox="0 0 132 24"
                            className="w-full h-full"
                            dangerouslySetInnerHTML={{ __html: decodeURI(hotel.bubbleRating) }}
                        />
                    </div>
                    <span className="text-sm text-gray-600">{hotel.rating.reviewCount.toLocaleString()}</span>
                </div>
            </div>
            </div>
                  
                <div className="flex items-end justify-between p-2">

                    <div className="flex flex-col">
                        <span className="text-gray-600"> from </span>
                        <div><span className="text-lg font-semibold"> {currencyExchangeSpec("USD",parseInt(hotel.averagePrice),rates,currency)?.toFixed(0)!.toLocaleString() + " " + currency || "N/A"} </span> <span className="text-gray-600">/night</span></div>
                    </div>

                    <div>
                        {id &&
                        <Link to={`/stays/${id}/hotel/`+index}>
                        <button className="bg-[var(--primary-color)] hover:bg-[var(--primary-color-dark)] rounded-sm p-2 text-sm">
                            Reserve
                        </button> 
                        </Link>
                        }
                        {!id &&
                        <Link to={"/stays/hotel/"+index}>
                        <button className="bg-[var(--primary-color)] hover:bg-[var(--primary-color-dark)] rounded-sm p-2 text-sm">
                            Reserve
                        </button> 
                        </Link>
                        }
                    </div> 
                
            </div>   

        </div>
    )
}