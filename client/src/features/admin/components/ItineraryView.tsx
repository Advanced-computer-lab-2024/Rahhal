import { GenericModal } from "@/components/GenericModal";
import { useState, useEffect } from "react";
import { TItinerary } from "@/features/admin/utils/itineraries-columns";
import { DEFAULTS } from "@/lib/constants";
import { format } from "@/features/admin/utils/itineraries-details-formatter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { updateItinerary } from "@/api-calls/itineraries-api-calls";
import PictureViewer from "@/components/PictureViewer";

interface ItineraryViewProps {
  itineraryData?: TItinerary;
  dialogTrigger?: React.ReactNode;
}

type KeyValuePairViewProps = {
  itinerary: Partial<TItinerary>;
};

const KeyValuePairView = ({ itinerary }: KeyValuePairViewProps) => {
  const entries = Object.entries(itinerary).filter(([key, value]) => {
    const excludedFields = [
        "_id",
         "createdAt",
          "updatedAt",
           "__v",
           "owner",
           "images",
    ];
    if (!value) return false;
    if (Array.isArray(value) && value.length === 0) return false;
    if (excludedFields.includes(key)) return false;
    return true;
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Itinerary Details</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entries.map(([key, value]) => {
            const [formattedKey, formattedValue] = format(key, value);
            return (
              <div
                key={key}
                className="flex flex-col p-4 bg-muted rounded-lg overflow-hidden break-words"
              >
                <span className="text-sm font-medium text-muted-foreground mb-1">
                  {formattedKey}
                </span>
                <span className="text-base">{formattedValue}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export function ItineraryView({
     itineraryData,
      dialogTrigger
     }: ItineraryViewProps) {
  const [modalItineraryData, setModalItineraryData] = useState<TItinerary>(
    itineraryData ?? DEFAULTS.ITINERARY
  );

    useEffect(() => {
        if(!itineraryData) {
        setModalItineraryData(DEFAULTS.ITINERARY);
    }
 } ,[]);

 const handleSubmit = async () => {
    if (modalItineraryData) {
        await updateItinerary(modalItineraryData, null);
        }
    }

  return (
    <GenericModal
      title={"Itinerary Details"}
      description="Itinerary Details"
      dialogTrigger={dialogTrigger}
      onSubmit={handleSubmit}
    >
      <KeyValuePairView itinerary={modalItineraryData} />
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