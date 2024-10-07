import React from 'react';

interface LocationEntry {
  lat: number;
  lng: number;
}

interface ItineraryLocationsNonEditProps {
  locations: LocationEntry[];
}

const ItineraryLocationsNonEdit: React.FC<ItineraryLocationsNonEditProps> = ({
  locations,
}) => {
  return (
    <div>
      {locations.length === 0 ? (
        <p>No available locations set.</p>
      ) : (
        locations.map((location, index) => (
          <div key={index}>
            <p>
              Location {index + 1}: Latitude: {location.lat}, Longitude: {location.lng}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default ItineraryLocationsNonEdit;
