import {
  APIProvider,
  ControlPosition,
  Map,
  MapCameraChangedEvent,
  MapControl,
  Marker,
  useMap,
} from "@vis.gl/react-google-maps";
import { MapPin } from "lucide-react";
import PlacesAutocomplete from "./PlacesAutoComplete";

type GoogleMapProps = {
  isEditable: boolean;
  location: { lat: number; lng: number };
  setLocation: (location: { lat: number; lng: number }) => void;
};

function GoogleMap({ isEditable, location, setLocation }: GoogleMapProps) {
  return (
    <APIProvider apiKey="AIzaSyDH66WmNegr3ISHqJMqAFGfmg9eP3jI59g" language="en">
      <Map
        className="h-96"
        defaultZoom={13}
        center={location}
        onCameraChanged={(event: MapCameraChangedEvent) => {
          setLocation(event.detail.center);
        }}
        gestureHandling={isEditable ? "greedy" : "none"}
        clickableIcons={isEditable}
        streetViewControl={false}
        mapTypeControl={false}
      >
        <Marker position={location} />
        {isEditable && (
          <>
            <MapControl position={ControlPosition.TOP_RIGHT}>
              <CurrentLocationControl />
            </MapControl>
            <MapControl position={ControlPosition.TOP_LEFT}>
              <PlacesAutocomplete setLocation={setLocation} />
            </MapControl>
          </>
        )}
      </Map>
    </APIProvider>
  );
}

function CurrentLocationControl() {
  const map = useMap();

  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map?.panTo(pos);
        },
        () => {
          console.error("Error: The Geolocation service failed.");
        },
      );
    } else {
      console.error("Error: Your browser doesn't support geolocation.");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white mx-[10px] my-1 p-1 rounded-[2px]"
      aria-label="Get current location"
    >
      <MapPin className="w-8 h-8 text-gray-500" />
    </button>
  );
}

export default GoogleMap;
