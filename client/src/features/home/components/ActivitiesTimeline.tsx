
import { DEFAULT_ACTIVITY_IMAGE } from "../utils/constants";
import { EventCardProps, Timeline } from "./Timeline";
import { useEffect, useState } from "react";
interface ActivitiesTimelineProps {
  activities: string[];
  durationOfActivities: string[];
  locations: { longitude: number; latitude: number }[];
}

function activityToEvent(activity: string, durationOfActivity: string): EventCardProps {
  return {
    title: activity,

    duration: durationOfActivity,

    imageUrl: DEFAULT_ACTIVITY_IMAGE,
  };
}

function activitiesToEvents(activities: string[], durationOfActivities: string[]): EventCardProps[] {
  return activities.map((activity, index) => activityToEvent(activity, durationOfActivities[index]));
    
}

export function ActivitiesTimeline({ activities, durationOfActivities, locations }: ActivitiesTimelineProps) {
  const [events, setEvents] = useState<EventCardProps[]>([]);

  useEffect(() => {
    setEvents(activitiesToEvents(activities, durationOfActivities));
  }, [activities]);

  return <Timeline events={events} />;
}

