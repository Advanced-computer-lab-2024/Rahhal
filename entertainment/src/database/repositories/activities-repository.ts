import Activity from "../models/Activity";
import type { IActivity } from "../models/Activity";
import type { IRating } from "@/database/shared";

// Get all activities
export async function getAllActivities() {
  return await Activity.find().populate("category").populate("preferenceTags").exec();
}

// Get all appropriate activities
export async function getAppropriateActivities() {
  return await Activity.find({ isAppropriate: true })
    .populate("category")
    .populate("preferenceTags")
    .exec();
}

// Get activity by id
export async function getActivityById(id: string) {
  return await Activity.findById(id).populate("category").populate("preferenceTags").exec();
}

export async function getActivitiesByOwner(ownerId: string) {
  return await Activity.find({ owner: ownerId })
    .populate("category")
    .populate("preferenceTags")
    .exec();
}

// Create a new activity
export async function createActivity(activitiesData: IActivity) {
  const newActivity = new Activity(activitiesData);
  return await newActivity.save();
}

export async function addRating(userRating: IRating, activityId: string) {
  return await Activity.findByIdAndUpdate(
    activityId,
    { $push: { ratings: userRating } },
    { new: true },
  );
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
