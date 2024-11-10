import { GenericModal } from "@/components/GenericModal";
import { useState, useEffect } from "react";
import { TItinerary } from "@/features/admin/utils/columns-definitions/itineraries-columns";
import { DEFAULTS } from "@/lib/constants";
import { format } from "@/features/admin/utils/key-value-formatters/itineraries-details-formatter";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { updateItinerary } from "@/api-calls/itineraries-api-calls";
import PictureViewer from "@/components/PictureViewer";
import KeyValuePairGrid from "@/components/KeyValuePairGrid";

interface ItineraryViewProps {
  itineraryData?: TItinerary;
  dialogTrigger?: React.ReactNode;
}

export function ItineraryView({ itineraryData, dialogTrigger }: ItineraryViewProps) {
  const [modalItineraryData, setModalItineraryData] = useState<TItinerary>(
    itineraryData ?? DEFAULTS.ITINERARY,
  );

  useEffect(() => {
    if (!itineraryData) {
      setModalItineraryData(DEFAULTS.ITINERARY);
    }
  }, []);

  const handleSubmit = async () => {
    if (modalItineraryData) {
      await updateItinerary(modalItineraryData, null);
    }
  };

  return (
    <GenericModal
      title={"Itinerary Details"}
      description="Itinerary Details"
      dialogTrigger={dialogTrigger}
      onSubmit={handleSubmit}
    >
      <KeyValuePairGrid
        data={modalItineraryData}
        formatter={format}
        excludedFields={["_id", "createdAt", "updatedAt", "__v", "owner", "images"]}
      />
      <div className="flex items-center space-x-2 pt-4">
        <PictureViewer
          title="Itinerary Images"
          description="Itinerary Images"
          imageSources={modalItineraryData.images}
        />
        <Checkbox
          id="inappropriate"
          checked={!modalItineraryData.appropriate}
          onCheckedChange={(checked) => {
            setModalItineraryData({
              ...modalItineraryData,
              appropriate: !checked,
            });
          }}
        />
        <Label htmlFor="inappropriate">Inappropriate Itinerary</Label>
      </div>
    </GenericModal>
  );
}
