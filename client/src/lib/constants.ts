export const SERVICES_URLS = {
  ENTERTAINMENT: "http://localhost:3003",
};

export const DEFAULTS = {
  ACTIVITY: {
    name: "",
    date: new Date(),
    time: new Date(),
    location: { longitude: 0, latitude: 0 },
    specialDiscounts: [],
    preferenceTags: [],
    isBookingOpen: false,
    price: 0,
    category: { _id: "", category: "" },
    tags: [],
    ratings: [],
  },
};
