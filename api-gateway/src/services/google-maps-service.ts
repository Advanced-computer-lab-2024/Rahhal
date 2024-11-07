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
interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export async function getPlaceAutocomplete(place: string, filter: string) {
  const { data } = await axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
    params: {
      input: place,
      key: GOOGLE_MAPS_API_KEY,
      types: filter,
    },
  });
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
  const { data } = await axios.get("https://maps.googleapis.com/maps/api/place/details/json", {
    params: {
      place_id: placeId,
      fields: "name,formatted_address,geometry,address_component",
      key: GOOGLE_MAPS_API_KEY,
    },
  });

  const { name, formatted_address, geometry, address_components } = data.result;

  // Extract country code from address components
  const countryComponent = address_components.find((component: AddressComponent) =>
    component.types.includes("country"),
  );
  const countryCode = countryComponent ? countryComponent.short_name : null;

  return {
    name: name,
    description: formatted_address,
    location: geometry.location,
    countryCode: countryCode,
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
