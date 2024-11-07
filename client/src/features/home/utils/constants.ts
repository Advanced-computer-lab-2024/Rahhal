import { DEFAULTS } from "@/lib/constants"
import { TPopulatedBooking } from "../types/home-page-types"

export const DEFAULT_ACTIVITY_IMAGE = "https://t3.ftcdn.net/jpg/08/15/01/32/360_F_815013230_hIwk7fuEsd3sw2HDOdkgYbD2Fn7gMURr.jpg"

export const DEFAULT_ACTIVITY_BOOKING: TPopulatedBooking = {
    _id: "",
    user: "",
    entity: DEFAULTS.ACTIVITY,
    type: "activity",
    status: "cancelled",
    selectedPrice: 0,
    selectedDate: new Date(),

    }

export const DEFAULT_ITINERARY_BOOKING: TPopulatedBooking = {
    _id: "",
    user: "",
    entity: DEFAULTS.ITINERARY,
    type: "itinerary",
    status: "cancelled",
    selectedPrice: 0,
    selectedDate: new Date(),
}