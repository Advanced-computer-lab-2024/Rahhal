import Itinerary from "../models/Itinerary";
import type { IItinerary } from "../models/Itinerary";

// Get all itineraries
export async function getAllItineraries() {
  return await Itinerary.find().populate("category").populate("preferenceTags").exec();
}

// Get all active & appropriate itineraries
export async function getActiveAppropriateItineraries() {
  return await Itinerary.find(
    { active: true, appropriate: true }
  )
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
  return await Itinerary.findByIdAndDelete(id);
}
