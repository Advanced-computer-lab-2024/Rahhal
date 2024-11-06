import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import FlightCardRoute from "./FlightCardRoute"

interface FlightCardProps {
  airline: string
  departureTime: string
  departureCode: string
  arrivalTime: string
  arrivalCode: string
  price: number
  isOneWay: boolean
  returnDepartureTime?: string
  returnDepartureCode?: string
  returnArrivalTime?: string
  returnArrivalCode?: string
  currency?: string
  onSelect?: () => void
}

export default function FlightCard(props: FlightCardProps) {
  return (
    <Card className="w-full max-w-2xl p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-8">
        <div className="font-semibold text-lg text-primary">{props.airline}</div>
        <div className="flex flex-col gap-3">
        
        <FlightCardRoute 
          departureTime={props.departureTime}
          departureCode={props.departureCode}
          arrivalTime={props.arrivalTime}
          arrivalCode={props.arrivalCode}
        />

        {!props.isOneWay && (
          <FlightCardRoute
            departureTime={props.returnDepartureTime || ""}
            departureCode={props.returnDepartureCode || ""}
            arrivalTime={props.returnArrivalTime || ""}
            arrivalCode={props.returnArrivalCode || ""}
          />)
        }

        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="text-right">
          <div className="text-lg font-semibold whitespace-nowrap">
            {props.currency} {props.price.toLocaleString()}
          </div>
        </div>
        <Button
          onClick={props.onSelect}
          className="bg-[#E6B954] hover:bg-[#d4a83d] text-black"
        >
          Select
        </Button>
      </div>
    </Card>
  )
}
