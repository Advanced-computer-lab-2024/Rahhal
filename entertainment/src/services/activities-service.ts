import type { IActivity } from "../database/models/Activity";
import type { IRating } from "@/database/shared";
import * as activitiesRepository from "../database/repositories/activities-repository";
import { hasBookings } from "@/utils/booking-axios-instance";
import { bookingType } from "@/utils/constants";
import { publishNotification } from "@/publishers/notification-publisher";
import { publishEventOpen } from "@/publishers/event-open-publisher";

// Get all activities
export async function getAllActivities(filter: Partial<IActivity>) {
  return activitiesRepository.getAllActivities(filter);
}

// Get all appropriate activities
export async function getAppropriateActivities() {
  return activitiesRepository.getAppropriateActivities();
}

// Get activity by id
export async function getActivityById(id: string) {
  return activitiesRepository.getActivityById(id);
}

// Create a new activity
export async function createActivity(activitiesData: IActivity) {
  return activitiesRepository.createActivity(activitiesData);
}

export async function addRating(userRating: IRating, activityId: string) {
  return activitiesRepository.addRating(userRating, activityId);
}

// Update an existing activity
export async function updateActivity(id: string, activitiesData: IActivity) {
  if (activitiesData.isAppropriate === false) {
    await sendMarkedInappropriateNotification(id);
  }

  if(activitiesData.isBookingOpen === true) {
    await sendActivityOpenNotification(id);
  }

  return activitiesRepository.updateActivity(id, activitiesData);
}

// Delete an activity
export async function deleteActivity(id: string) {
  const isBooked = await hasBookings(id, bookingType.Activity);
  if (isBooked) {
    throw new Error("Cannot delete activity with bookings");
  } else {
    return activitiesRepository.deleteActivity(id);
  }
}

export async function sendMarkedInappropriateNotification(activityId: string) {
  const activity = await activitiesRepository.getActivityById(activityId);
  if (activity) {
    const data = {
      userId: activity.owner,
      message: `Your Activity : \n Name: ${activity.name} with Date ${activity.date} \nhas been marked inappropriate \nPlease review and take necessary action.`,
    };

    await publishNotification(data);
  } else {
    throw new Error("Activity not found");
  }
}

export async function sendActivityOpenNotification(activityId: string) {
  const activity = await activitiesRepository.getActivityById(activityId);
  if (activity) {
    const data = {
      entityId: activityId,
      message: `Booking for Activity with: \n Name: ${activity.name} and Date ${activity.date} \nis now open. \nBook your slots now!`,
    };

    await publishEventOpen(data);
  } else {
    throw new Error("Activity not found");
  }
}
