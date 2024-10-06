import { CONSTANTS } from "@/utils/constants";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

interface IAutocompletePrediction {
  description: string;
  place_id: string;
  reference: string;
}

export async function getPlaceAutocomplete(place: string) {
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${place}&key=${GOOGLE_MAPS_API_KEY}`,
  );
  const predictions = data.predictions;
  return predictions.map((prediction: IAutocompletePrediction) => {
    return {
      description: prediction.description,
      place_id: prediction.place_id,
      reference: prediction.reference,
    };
  });
}

export async function getPlaceDetailsById(placeId: string) {
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${GOOGLE_MAPS_API_KEY}`,
  );
  const { formatted_address, geometry } = data.results[CONSTANTS.ZERO];
  return {
    description: formatted_address,
    location: geometry.location,
  };
}

export async function getPlaceDetailsByLocation(location: { lat: number; lng: number }) {
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${GOOGLE_MAPS_API_KEY}&location_type=APPROXIMATE`,
  );
  const { formatted_address, place_id } = data.results[CONSTANTS.ZERO];
  return {
    description: formatted_address,
    placeId: place_id,
  };
}
