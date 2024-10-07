import LocationMap from "@/components/google-maps/LocationMap";

function NonTouristView() {
  return (
    <LocationMap
      initialLocation={{ lat: 37.7749, lng: -122.4194 }}
      onSave={async (location) => console.log(`location: ${location}`)}
    />
  );
}

export default NonTouristView;
