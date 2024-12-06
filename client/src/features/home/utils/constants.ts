import { DEFAULTS } from "@/lib/constants";
import { PopulatedCart, TPopulatedBooking } from "../types/home-page-types";

export const DEFAULT_ACTIVITY_IMAGE =
  "https://t3.ftcdn.net/jpg/08/15/01/32/360_F_815013230_hIwk7fuEsd3sw2HDOdkgYbD2Fn7gMURr.jpg";

export const DEFAULT_ACTIVITY_BOOKING: TPopulatedBooking = {
  _id: "",
  user: "",
  entity: DEFAULTS.ACTIVITY,
  type: "activity",
  status: "cancelled",
  selectedPrice: 0,
  selectedDate: new Date(),
};

export const DEFAULT_ITINERARY_BOOKING: TPopulatedBooking = {
  _id: "",
  user: "",
  entity: DEFAULTS.ITINERARY,
  type: "itinerary",
  status: "cancelled",
  selectedPrice: 0,
  selectedDate: new Date(),
};

export const DEFAULT_ACTIVITY = {
  _id: "",
  name: "",
  description: "",
  time: new Date(),
  images: [],
  date: new Date(),
  location: { longitude: 0, latitude: 0 },
  specialDiscount: 0,
  preferenceTags: [],
  isBookingOpen: false,
  price: {},
  category: { _id: "", name: "" },
  tags: [],
  ratings: [],
  owner: "",
  ownerName: "",
};

export const DEFAULT_ITINERARY = {
  _id: undefined,
  name: "",
  images: [],
  description: "",
  activities: [],
  locations: [],
  timeline: "",
  durationOfActivities: [],
  languages: [],
  price: 0,
  availableDatesTime: [
    {
      Date: new Date(new Date().setDate(new Date().getDate() + 1)),
      Time: new Date(new Date().setDate(new Date().getDate() + 1)),
    },
  ],
  accessibility: "",
  pickUpLocation: { longitude: 0, latitude: 0 },
  dropOffLocation: { longitude: 0, latitude: 0 },
  ratings: [],
  preferenceTags: [],
  category: { _id: "", name: "" },
  active: false,
  owner: "",
  ownerName: "",
};
export const DEFAULT_CART: PopulatedCart = {
  _id: "",
  user: "",
  products: [],
};
