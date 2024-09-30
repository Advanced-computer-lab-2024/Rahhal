import express from 'express';
import activitiesController from '../controllers/activities-controller';

const router = express.Router();

// Activities routes

router.get('/', activitiesController.getAllActivities); // Get all activities
router.get('/:id', activitiesController.getActivityById); // Get activity by id
router.post('/', activitiesController.createActivity); // Create a new activity
router.put('/:id', activitiesController.updateActivity); // Update an existing activity
router.delete('/:id', activitiesController.deleteActivity); // Delete an activity


module.exports = router;