import { Skeleton } from "@/components/ui/skeleton"
import { IHotelDetails } from "@/features/home/types/home-page-types";
import HotelCard from "./HotelCard";

interface HotelGridViewProps {
    loading: boolean;
    hotels: IHotelDetails[];
}

export default function HotelGridView(props : HotelGridViewProps) {


return(
    <div className="grid grid-cols-5 gap-y-4 gap-x-4 w-full justify-items-center px-[10%] py-4">
        { props.loading &&
            Array.from({length: 30}).map((_, index) => (
                <div key={index} className="flex flex-col gap-4 w-[100%] h-[27rem] justify-center w-full h-[27rem]">
                    <Skeleton className="w-full h-[24rem] " />
                    <div className="space-y-2">
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-[75%]" />
                    </div>
                </div>
            ))  
        }

        {
            !props.loading && props.hotels.map((hotel, index) => (
                <HotelCard index={index} key={index} hotel={hotel} />
            ))
        }

    </div>
)
}