import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ItineraryLocationsEdit from "./ItineraryLocationsEdit";
import ItineraryLocationsNonEdit from "./ItineraryLocationsNonEdit";
import { Label } from "@/components/ui/label";
import { Settings2 } from "lucide-react";

interface LocationEntry {
  lat: number;
  lng: number;
}

interface ItineraryLocationsProps {
  locations: LocationEntry[];
  onSave: (newLocations: LocationEntry[]) => void;
}

const ItineraryLocations: React.FC<ItineraryLocationsProps> = ({
  locations,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (newLocations: LocationEntry[]) => {
    onSave(newLocations); // Call the parent's onSave to update locations
    setIsEditing(false); // Close editing after saving
  };

  const handleAdd = () => {
    setIsEditing(true); // Open the editing form
  };

  return (
    <div>
      <div className="flex gap-3 items-center">
        <Label className="text-lg">Locations</Label>
        <Button variant="link" className="p-0" onClick={handleAdd}>
          <Settings2 className="h-5 w-5 text-primary-color" />
        </Button>
      </div>
      {isEditing ? (
        <ItineraryLocationsEdit
          locations={locations}
          onSave={handleSave} // Pass the handleSave to ItineraryLocationsEdit
        />
      ) : (
        <ItineraryLocationsNonEdit locations={locations} />
      )}
    </div>
  );
};

export default ItineraryLocations;
