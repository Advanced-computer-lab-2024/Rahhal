import { TActivity } from "@/features/advertiser/utils/advertiser-columns";
import { EventCardProps, Timeline } from "./Timeline";
import { useEffect, useState } from "react";
import { formatDate } from "../utils/filter-lists/overview-card";

interface ActivitiesTimelineProps {
  activities: string[];
  durationOfActivities: string[];
  locations: { longitude: number; latitude: number }[];
}

function activityToEvent(activity: string, durationOfActivity: string): EventCardProps {
  return {
    title: activity,

    duration: durationOfActivity,

    imageUrl: "",
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

