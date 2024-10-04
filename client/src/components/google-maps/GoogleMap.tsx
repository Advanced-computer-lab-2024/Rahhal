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
import { useState } from "react";

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

function GoogleMap() {
  const [cords, setCords] = useState({ lat: -33.860664, lng: 151.208138 });

  return (
    <APIProvider apiKey="AIzaSyDH66WmNegr3ISHqJMqAFGfmg9eP3jI59g" language="en">
      <Map
        style={{ width: "100%", height: "100%" }}
        defaultZoom={13}
        defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
        onCameraChanged={(ev: MapCameraChangedEvent) => {
          setCords(ev.detail.center);
        }}
        gestureHandling={"greedy"}
        streetViewControl={false}
        mapTypeControl={false}
      >
        <Marker position={cords} />
        <MapControl position={ControlPosition.TOP_RIGHT}>
          <CurrentLocationControl />
        </MapControl>
      </Map>
    </APIProvider>
  );
}

export default GoogleMap;
