import GoogleMap from "@/components/google-maps/GoogleMap";
import PlacesAutoComplete from "@/components/google-maps/PlacesAutoComplete";

function NonTouristView() {
  return (
    <>
      {/* <DataTable /> */}
      <PlacesAutoComplete />
      <GoogleMap />
    </>
  );
}

export default NonTouristView;
