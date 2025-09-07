import HistoricalPlace from "../models/HistoricalPlace";
import type { IHistoricalPlace } from "../models/HistoricalPlace";

// Get all historical places
export async function getAllHistoricalPlaces() {
  return await HistoricalPlace.find()
    .populate("tags")
    .populate("category")
    .populate("preferenceTags")
    .exec();
}

// Get historical place by id
export async function getHistoricalPlaceById(id: string) {
  return await HistoricalPlace.findById(id)
    .populate("tags")
    .populate("category")
    .populate("preferenceTags")
    .exec();
}

export async function getHistoricalPlacesByOwner(ownerId: string) {
  return await HistoricalPlace.find({ owner: ownerId })
    .populate("tags")
    .populate("category")
    .populate("preferenceTags")
    .exec();
}

// Create a new historical place
export async function createHistoricalPlace(historicalPlaceData: IHistoricalPlace) {
  const newHistoricalPlace = new HistoricalPlace(historicalPlaceData);
  return await newHistoricalPlace.save();
}

// Update an existing historical place
export async function updateHistoricalPlace(id: string, historicalPlaceData: IHistoricalPlace) {
  return await HistoricalPlace.findByIdAndUpdate(id, historicalPlaceData, {
    new: true,
    runValidators: true,
  });
}

// Delete a historical place
export async function deleteHistoricalPlace(id: string) {
  return await HistoricalPlace.findByIdAndDelete(id);
}
