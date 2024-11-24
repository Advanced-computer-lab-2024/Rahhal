
import { DEFAULT_ACTIVITY_IMAGE } from "../utils/constants";
import  Timeline, { ITimelineEvent }  from "./Timeline";
import { useEffect, useState } from "react";
interface ActivitiesTimelineProps {
  activities: string[];
  durationOfActivities: string[];
  locations: { longitude: number; latitude: number }[];
}

function activityToEvent(activity: string, durationOfActivity: string, index: number): ITimelineEvent {
  return {
    id: index,
    title: activity,
    subtitle: durationOfActivity,
    icon: DEFAULT_ACTIVITY_IMAGE,
    done: false,
    active: true,
  };
}

function activitiesToEvents(activities: string[], durationOfActivities: string[]): ITimelineEvent[] {
  return activities.map((activity, index) => activityToEvent(activity, durationOfActivities[index], index));
    
}

export function ActivitiesTimeline({ activities, durationOfActivities, locations }: ActivitiesTimelineProps) {
  const [events, setEvents] = useState<ITimelineEvent[]>([]);

  useEffect(() => {
    setEvents(activitiesToEvents(activities, durationOfActivities));
  }, [activities]);

  return <Timeline events={events} />;
}

