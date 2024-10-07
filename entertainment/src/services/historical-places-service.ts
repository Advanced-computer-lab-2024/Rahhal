import type { IHistoricalPlace } from "../database/models/HistoricalPlace";
import * as historicalPlacesRepository from "../database/repositories/historical-places-repository";

// Get all historical places
export async function getAllHistoricalPlaces() {
  return historicalPlacesRepository.getAllHistoricalPlaces();
}

// Get historical place by id
export async function getHistoricalPlaceById(id: string) {
  return historicalPlacesRepository.getHistoricalPlaceById(id);
}

// Create a new historical place
export async function createHistoricalPlace(historicalPlaceData: IHistoricalPlace) {
  return historicalPlacesRepository.createHistoricalPlace(historicalPlaceData);
}

// Update an existing historical place
export async function updateHistoricalPlace(id: string, historicalPlaceData: IHistoricalPlace) {
  return historicalPlacesRepository.updateHistoricalPlace(id, historicalPlaceData);
}

// Delete a historical place
export async function deleteHistoricalPlace(id: string) {
  return historicalPlacesRepository.deleteHistoricalPlace(id);
}
