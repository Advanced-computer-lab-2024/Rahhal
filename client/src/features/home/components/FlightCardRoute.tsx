import { Plane } from "lucide-react"

interface FlightCardRouteProps {
  departureTime: string
  departureCode: string
  arrivalTime: string
  arrivalCode: string
}

export default function FlightCardRoute(props: FlightCardRouteProps) {
  return (
    <>
      <div className="flex items-center gap-3">
           <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold">{props.departureTime}</span>
            <span className="text-sm text-muted-foreground">{props.departureCode}</span>
          </div>
          <div className="flex items-center gap-2 w-32 md:w-48">
            <div className="h-[1px] flex-1 bg-muted-foreground/30" />
            <Plane className="size-4 text-muted-foreground rotate-45 -translate-y-[1px]" />
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold">{props.arrivalTime}</span>
            <span className="text-sm text-muted-foreground">{props.arrivalCode}</span>
          </div>
        </div>
    </>
  )
}
