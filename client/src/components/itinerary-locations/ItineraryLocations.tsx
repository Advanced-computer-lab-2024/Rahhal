import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ItineraryLocationsEdit from "./ItineraryLocationsEdit";
import ItineraryLocationsNonEdit from "./ItineraryLocationsNonEdit";

interface LocationEntry {
  lat: number;
  lng: number;
}

interface ItineraryLocationsProps {
  locations: LocationEntry[];
  onSave: (newLocations: LocationEntry[]) => void;
}

const ItineraryLocations: React.FC<ItineraryLocationsProps> = ({ locations, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (newLocations: LocationEntry[]) => {
    onSave(newLocations); // Call the parent's onSave to update locations
    setIsEditing(false); // Close editing after saving
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <span>Available Locations</span>
        <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Cancel" : "Edit"}</Button>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <ItineraryLocationsEdit
            locations={locations}
            onSave={handleSave} // Pass the handleSave to ItineraryLocationsEdit
          />
        ) : (
          <ItineraryLocationsNonEdit locations={locations} />
        )}
      </CardContent>
    </Card>
  );
};

export default ItineraryLocations;
