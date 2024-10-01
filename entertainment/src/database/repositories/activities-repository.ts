import Activity from "../models/Activity";
import { IActivity } from "../models/Activity";

// Get all activities
export async function getAllActivities() {
  return await Activity.find();
}

// Get activity by id
export async function getActivityById(id: string) {
  return await Activity.findById(id);
}

// Create a new activity
export async function createActivity(activitiesData: IActivity) {
  const newActivity = new Activity(activitiesData);
  return await newActivity.save();
}

// Update an existing activity
export async function updateActivity(id: string, activitiesData: IActivity) {
  return await Activity.findByIdAndUpdate(id, activitiesData, {
    new: true,
    runValidators: true,
  });
}

// Delete an activity
export async function deleteActivity(id: string) {
  return await Activity.findByIdAndDelete(id);
}
