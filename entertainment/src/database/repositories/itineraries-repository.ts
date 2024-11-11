import Itinerary from "../models/Itinerary";
import type { IItinerary } from "../models/Itinerary";
import type { IRating } from "@/database/shared";

// Get all itineraries
export async function getAllItineraries(filter: Partial<IItinerary>) {
  return await Itinerary.find({ deleted: false, ...filter })
    .populate("category")
    .populate("preferenceTags")
    .exec();
}

// Get all active & appropriate itineraries
export async function getActiveAppropriateItineraries() {
  return await Itinerary.find({ active: true, appropriate: true, deleted: false })
    .populate("category")
    .populate("preferenceTags")
    .exec();
}

// Get itinerary by id
export async function getItineraryById(id: string) {
  return await Itinerary.findById(id).populate("category").populate("preferenceTags").exec();
}

// Create a new itinerary
export async function createItinerary(itineraryData: IItinerary) {
  const newItinerary = new Itinerary(itineraryData);
  return await newItinerary.save();
}

// Update an existing itinerary
export async function updateItinerary(id: string, itineraryData: IItinerary) {
  return await Itinerary.findByIdAndUpdate(id, itineraryData, {
    new: true,
    runValidators: true,
  });
}

// Delete an itinerary
export async function deleteItinerary(id: string) {
  return await Itinerary.findByIdAndUpdate(id, { deleted: true }, { new: true });
}

export async function addRating(userRating: IRating, itineraryId: string) {
  return await Itinerary.findByIdAndUpdate(
    itineraryId,
    { $push: { ratings: userRating } },
    { new: true },
  );
}
