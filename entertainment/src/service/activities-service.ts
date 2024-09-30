import { IActivity } from "../models/Activity";
import * as activitiesRepository from "../repository/activities-repository";


// Get all activities
export async function getAllActivities() {
    return activitiesRepository.getAllActivities();
}

// Get activity by id
export async function getActivityById(id: string) {
    return activitiesRepository.getActivityById(id);
}

// Create a new activity
export async function createActivity(activitiesData: IActivity) {
    return activitiesRepository.createActivity(activitiesData);
}

// Update an existing activity
export async function updateActivity(id: string, activitiesData: IActivity) {
    return activitiesRepository.updateActivity(id, activitiesData);
}

// Delete an activity
export async function deleteActivity(id: string) {
    return activitiesRepository.deleteActivity(id);
}


