import { useState } from "react";
import { Check, Plus, PlusCircle, X, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ItineraryActivitiesEdit from "./ItineraryActivitiesEdit";
import ItineraryActivitiesNonEdit from "./ItineraryActivitiesNonEdit";
import { Label } from "@/components/ui/label";

interface ItineraryActivities {
  title: string;
  itineraryActivities: { type: string; duration: string }[];
  initialIsDisabled?: boolean;
  onItineraryActivityChange: (itineraryActivities: { type: string; duration: string }[]) => void;
}

const ItineraryActivities = ({
  title,
  itineraryActivities,
  initialIsDisabled = false,
  onItineraryActivityChange,
}: ItineraryActivities) => {
  let itineraryActivitiesWithId = itineraryActivities.map((activity, index) => ({
    id: index,
    ...activity,
  }));

  const [isDisabled, setIsDisabled] = useState(initialIsDisabled);
  const [activities, setActivities] = useState(itineraryActivitiesWithId);
  const [newType, setNewType] = useState("");
  const [newDuration, setNewDuration] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editType, setEditType] = useState("");
  const [editDuration, setEditDuration] = useState("");
  const [isAdding, setIsAdding] = useState(true);

  const addActivity = () => {
    if (newType && newDuration) {
      const newId = activities.length ? activities[activities.length - 1].id + 1 : 1;
      setActivities([...activities, { id: newId, type: newType, duration: newDuration }]);
      setNewType("");
      setNewDuration("");
      onItineraryActivityChange([...activities, { type: newType, duration: newDuration }]);
    }
  };

  const removeActivity = (id: number) => {
    setActivities(activities.filter((activity) => activity.id !== id));
    onItineraryActivityChange(activities.filter((activity) => activity.id !== id));
  };

  const startEditing = (activity: { id: number; type: string; duration: string }) => {
    setEditingId(activity.id);
    setEditType(activity.type);
    setEditDuration(activity.duration);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditType("");
    setEditDuration("");
  };

  const saveEdit = () => {
    if (editType && editDuration) {
      setActivities(
        activities.map((activity) =>
          activity.id === editingId
            ? { ...activity, type: editType, duration: editDuration }
            : activity,
        ),
      );
      setEditingId(null);
      setEditType("");
      setEditDuration("");
      onItineraryActivityChange(
        activities.map((activity) =>
          activity.id === editingId
            ? { ...activity, type: editType, duration: editDuration }
            : activity,
        ),
      );
    }
  };

  return (
    <div>
      <div className="flex gap-3 items-center">
        <Label className="text-lg">Activites</Label>
        <Button variant="link" className="p-0" onClick={() => setIsAdding(true)}>
          <PlusCircle className="h-5 w-5 text-primary-color" />
        </Button>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex justify-between items-center border py-2 px-4 rounded-md"
          >
            {editingId === activity.id ? (
              <ItineraryActivitiesEdit
                editType={editType}
                setEditType={setEditType}
                editDuration={editDuration}
                setEditDuration={setEditDuration}
                saveEdit={saveEdit}
                cancelEditing={cancelEditing}
              />
            ) : (
              <ItineraryActivitiesNonEdit
                activity={activity}
                startEditing={startEditing}
                removeActivity={removeActivity}
              />
            )}
          </div>
        ))}
        {!isDisabled && isAdding && (
          <div className="flex space-x-2">
            <Input
              placeholder="Activity"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
            />
            <Input
              placeholder="Duration"
              value={newDuration}
              onChange={(e) => setNewDuration(e.target.value)}
            />
            <div className="flex">
              <Button onClick={() => setIsAdding(false)} variant="link">
                <XIcon className="h-4 w-4 hover:text-primary/60" />
              </Button>
              <Button onClick={addActivity} variant="link">
                <Check className="h-4 w-4 hover:text-primary/60" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryActivities;
