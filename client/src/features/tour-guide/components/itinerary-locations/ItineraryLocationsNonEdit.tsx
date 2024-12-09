import { fetchLocationDetails } from "@/api-calls/google-maps-api-calls";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface LocationEntry {
  lat: number;
  lng: number;
}

interface LocationDetails {
  description: string;
}

interface ItineraryLocationsNonEditProps {
  locations: LocationEntry[];
}

async function fetchLocationNames(locations: LocationEntry[]) {
  const locationNames = await Promise.all(
    locations.map(async (location) => {
      const locationDetails = (await fetchLocationDetails(location)) as LocationDetails;
      return locationDetails.description;
    }),
  );
  return locationNames;
}

const ItineraryLocationsNonEdit: React.FC<ItineraryLocationsNonEditProps> = ({ locations }) => {
  const {
    data: locationNames,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["locationNames", locations],
    queryFn: () => fetchLocationNames(locations),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching locations</div>;
  return (
    <div>
      {locations.length === 0 ? (
        <p>No available locations set.</p>
      ) : (
        locationNames?.map((name, index) => (
          <div key={index}>
            <p>
              Location {index + 1}: {name}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default ItineraryLocationsNonEdit;
