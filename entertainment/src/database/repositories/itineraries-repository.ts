import Itinary from "../models/Itinerary";
import type { IItinerary } from "../models/Itinerary";

// Get all itineraries
export async function getAllItineraries() {
  return await Itinary.find().populate("owner");
}

// Get itinerary by id
export async function getItineraryById(id: string) {
  return await Itinary.findById(id).populate("owner");
}

// Create a new itinerary
export async function createItinerary(itineraryData: IItinerary) {
  const newItinerary = new Itinary(itineraryData);
  return await newItinerary.save();
}

// Update an existing itinerary
export async function updateItinerary(id: string, itineraryData: IItinerary) {
  return await Itinary.findByIdAndUpdate(id, itineraryData, {
    new: true,
    runValidators: true,
  });
}

// Delete an itinerary
export async function deleteItinerary(id: string) {
  return await Itinary.findByIdAndDelete(id);
}
