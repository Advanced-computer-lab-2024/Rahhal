import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ItineraryActivitiesEdit from "./ItineraryActivitiesEdit";
import ItineraryActivitiesNonEdit from "./ItineraryActivitiesNonEdit";
import EditSaveButton from "../EditSaveButton";

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
    <Card className="m-5 mx-6">
      <div className="p-3 flex justify-between">
        <CardTitle className="text-sm">{title}</CardTitle>
        <EditSaveButton
          isDisabled={isDisabled}
          saveChanges={() => setIsDisabled(true)}
          toggleEditMode={() => setIsDisabled(false)}
        />
      </div>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex justify-between items-center">
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
          {!isDisabled && (
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
              <Button onClick={addActivity}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ItineraryActivities;
