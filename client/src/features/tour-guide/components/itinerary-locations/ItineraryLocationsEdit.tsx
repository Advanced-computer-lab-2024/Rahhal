import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import LocationMap from "@/components/google-maps/LocationMap";

interface LocationEntry {
  lat: number;
  lng: number;
}

interface ItineraryLocationsEditProps {
  locations: LocationEntry[];
  onSave: (newLocations: LocationEntry[]) => void; // Ensure onSave is defined
}

const ItineraryLocationsEdit: React.FC<ItineraryLocationsEditProps> = ({ locations, onSave }) => {
  const [editedLocations, setEditedLocations] = useState<LocationEntry[]>(locations);

  const handleAddEntry = () => {
    setEditedLocations([...editedLocations, { lat: 29.986828500000012, lng: 31.441345800000015 }]); // Initialize new location
  };

  const handleRemoveEntry = (index: number) => {
    const updatedLocations = editedLocations.filter((_, i) => i !== index);
    setEditedLocations(updatedLocations);
  };

  const handleSave = () => {
    onSave(editedLocations); // Call the parent's onSave to save the locations
  };

  return (
    <div className="space-y-4">
      {editedLocations.map((entry, index) => (
        <div key={index}>
          <LocationMap
            initialLocation={{ lat: entry.lat, lng: entry.lng }}
            onSave={(location) => {
              const updatedLocations = [...editedLocations];
              updatedLocations[index] = { ...location }; // Update the specific entry
              setEditedLocations(updatedLocations); // Update the state
            }}
            title={`Location ${index + 1}`}
          />
          <Button onClick={() => handleRemoveEntry(index)}>Remove</Button>
        </div>
      ))}
      <Button onClick={handleAddEntry}>Add Location</Button>
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};

export default ItineraryLocationsEdit;
