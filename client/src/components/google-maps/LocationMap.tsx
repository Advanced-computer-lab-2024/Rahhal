import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import GoogleMap from "./GoogleMap";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Save } from "lucide-react";
import axios from "axios";
import { useDebounce } from "use-debounce";

async function fetchLocationDetails(location: { lat: number; lng: number }) {
  const { data } = await axios.get(
    `http://localhost:3000/api/google-maps/place-details/location?latitude=${location.lat}&longitude=${location.lng}`,
  );
  return data;
}

export default function LocationMap({
  initialLocation,
  onSave,
}: {
  initialLocation: { lat: number; lng: number };
  onSave: (location: { lat: number; lng: number }) => void;
}) {
  const [isEditable, setIsEditable] = useState(false);
  const [location, setLocation] = useState(initialLocation);
  const [debouncedLocation] = useDebounce(location, 500);
  const [description, setDescription] = useState("Loading...");

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      const placeDetails = await fetchLocationDetails(debouncedLocation);
      const placeDescription = placeDetails?.description;

      //TODO - Later, let's handle this by viewing an error toast
      setDescription(placeDescription || "Undefined");
    };
    console.log("fetching place details");
    fetchPlaceDetails();
  }, [debouncedLocation]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle>Location</CardTitle>
        {isEditable ? (
          <Button
            onClick={async () => {
              await onSave(location);
              setIsEditable(false);
            }}
          >
            <Save />
          </Button>
        ) : (
          <Button onClick={() => setIsEditable(true)}>
            <Edit2 />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <GoogleMap isEditable={isEditable} location={location} setLocation={setLocation} />
      </CardContent>
      <CardFooter className="text-gray-600 text-xl font-semibold">{description}</CardFooter>
    </Card>
  );
}
