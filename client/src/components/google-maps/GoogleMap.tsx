import {
  APIProvider,
  ColorScheme,
  ControlPosition,
  Map,
  MapCameraChangedEvent,
  MapControl,
  Marker,
  useMap,
} from "@vis.gl/react-google-maps";
import { MapPin } from "lucide-react";
import PlacesAutocomplete from "./PlacesAutoComplete";
import locationMarker from "@/assets/location-pin.png";
import { FaPlus, FaMinus } from "react-icons/fa";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { useState } from "react";

type GoogleMapProps = {
  isEditable: boolean;
  location: { lat: number; lng: number };
  setLocation: (location: { lat: number; lng: number }) => void;
  className?: string;
};

function GoogleMap({ isEditable, location, setLocation, className }: GoogleMapProps) {
  return (
    <APIProvider apiKey="AIzaSyD_l_y1DvE77M4PtKIlpcseCNFGDG4AN0s" language="en">
      <div className="h-96 rounded-2xl overflow-hidden">
        <Map
          className={`h-96 ${className || ""}`}
          defaultZoom={13}
          center={location}
          onCameraChanged={(event: MapCameraChangedEvent) => {
            setLocation(event.detail.center);
          }}
          gestureHandling={isEditable ? "greedy" : "none"}
          clickableIcons={isEditable}
          streetViewControl={false}
          mapTypeControl={false}
          fullscreenControl={false}
          zoomControl={false}
          colorScheme={ColorScheme.LIGHT}
        >
          <Marker
            position={location}
            icon={{
              url: locationMarker, // Path to the custom marker
              scaledSize: { width: 40, height: 40 },
            }}
          />
          {isEditable && (
            <>
              <MapControl position={ControlPosition.RIGHT_BOTTOM}>
                <CurrentLocationControl />
              </MapControl>
              <MapControl position={ControlPosition.TOP_CENTER}>
                <PlacesAutocomplete setLocation={setLocation} />
              </MapControl>
            </>
          )}
          {!isEditable && (
            <>
              <MapControl position={ControlPosition.RIGHT_TOP}>
                <div className="mr-4 mt-4">
                  <FullscreenControl />
                </div>
              </MapControl>
              <MapControl position={ControlPosition.RIGHT_BOTTOM}>
                <div className="flex flex-col mr-4 mb-4">
                  <ZoomInControl />
                  <ZoomOutControl />
                </div>
              </MapControl>
            </>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
function ZoomInControl() {
  const map = useMap();

  const handleClick = () => {
    map?.setZoom((map.getZoom() ?? 0) + 1);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white w-10 h-8 p-2 shadow rounded-t-md flex items-center justify-center hover:bg-gray-100"
      aria-label="Zoom in"
    >
      <FaPlus color="" />
    </button>
  );
}
function ZoomOutControl() {
  const map = useMap();

  const handleClick = () => {
    map?.setZoom((map.getZoom() ?? 0) - 1);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white w-10 h-8 p-2 rounded-b-md shadow flex items-center justify-center hover:bg-gray-100"
      aria-label="Zoom Out"
    >
      <FaMinus />
    </button>
  );
}
function FullscreenControl() {
  const [fullscreen, setFullscreen] = useState(false);
  const map = useMap();
  const handleToggleFullscreen = () => {
    if (map) {
      const mapDiv = map.getDiv();
      if (!fullscreen) {
        mapDiv?.requestFullscreen();
        setFullscreen(true);
      } else {
        document.exitFullscreen();
        setFullscreen(false);
      }
    }
  };
  return (
    <button
      onClick={handleToggleFullscreen}
      className="bg-white w-10 h-8 p-2 rounded-md shadow flex items-center justify-center hover:bg-gray-100"
      aria-label="Toggle fullscreen"
    >
      {fullscreen ? (
        <BsFullscreenExit size={15} strokeWidth={1.2} />
      ) : (
        <BsFullscreen size={15} strokeWidth={1.2} />
      )}
    </button>
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
      className="bg-white m-4 p-1 rounded-md shadow hover:bg-gray-100"
      aria-label="Get current location"
    >
      <MapPin className="w-8 h-8 text-gray-500" />
    </button>
  );
}

export default GoogleMap;
