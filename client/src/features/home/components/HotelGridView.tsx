import { Skeleton } from "@/components/ui/skeleton"
export default function HotelGridView() {

return(
    <div className="grid grid-cols-5 gap-y-4 gap-x-4 w-full justify-items-center px-[10%] py-4">
        {
            Array.from({length: 30}).map((_, index) => (
                <div key={index} className="flex flex-col gap-4 w-64 h-[24rem] justify-center">
                    <Skeleton className="w-64 h-[24rem] " />
                    <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            ))  
        }
    </div>
)
}