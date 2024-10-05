import axios from 'axios'
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

interface IAutocompletePrediction {
  description: string;
  place_id: string;
  reference: string;
}

export async function getPlaceAutocomplete(place: string) {
  const { data } = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${place}&key=${GOOGLE_MAPS_API_KEY}`);
  const predictions = data.predictions;
  return predictions.map((prediction: IAutocompletePrediction) => {
    return {
      "description": prediction.description,
      "place_id": prediction.place_id,
      "reference": prediction.reference
    };
  });
}
