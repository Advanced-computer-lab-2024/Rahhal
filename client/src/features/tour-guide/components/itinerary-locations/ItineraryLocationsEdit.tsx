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

const ItineraryLocationsEdit: React.FC<ItineraryLocationsEditProps> = ({
  locations,
  onSave,
}) => {
  const [editedLocations, setEditedLocations] =
    useState<LocationEntry[]>(locations);

  const handleAddEntry = () => {
    setEditedLocations([
      ...editedLocations,
      { lat: 29.986828500000012, lng: 31.441345800000015 },
    ]); // Initialize new location
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
        <div key={index} className="border rounded-lg p-4">
          <LocationMap
            initialLocation={{ lat: entry.lat, lng: entry.lng }}
            onSave={(location) => {
              const updatedLocations = [...editedLocations];
              updatedLocations[index] = { ...location }; // Update the specific entry
              setEditedLocations(updatedLocations); // Update the state
            }}
            title={`Location ${index + 1}`}
          />
          <div className="mt-2 flex justify-end">
            <Button
              onClick={() => handleRemoveEntry(index)}
              variant="destructive"
              size="sm"
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleAddEntry} variant="outline" className="flex-1">
          Add Location
        </Button>
        <Button onClick={handleSave} className="flex-1">
          Save
        </Button>
      </div>
    </div>
  );
};

export default ItineraryLocationsEdit;
