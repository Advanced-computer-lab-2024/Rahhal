export const SERVICES_URLS = {
  ENTERTAINMENT: "http://localhost:3000/api/entertainment",
  USER: "http://localhost:3000/api/user",
};

export const TEMP_USER_ID = "67032b20ffa86f21339f6cad";

export const DEFAULTS = {
  ACTIVITY: {
    _id: "",
    name: "",
    description: "",
    owner: "",
    date: new Date(),
    time: new Date(),
    location: { longitude: 31.1342, latitude: 29.9792 },
    specialDiscount: 0,
    preferenceTags: [],
    isBookingOpen: false,
    price: {},
    category: { _id: "", name: "" },
    tags: [],
    ratings: [],
  },
  HISTORICAL_PLACE: {
    _id: "",
    name: "",
    description: "",
    location: { longitude: 31.1342, latitude: 29.9792 },
    openingHours: { open: new Date(), close: new Date() },
    price: { foreigner: 0, native: 0, student: 0 },
    images: [],
    preferenceTags: [],
    owner: "",
    category: { _id: "", name: "" },
    tags: [],
    ratings: [],
  },
  CATEGORY: {
    _id: "",
    name: "",
  },
};
