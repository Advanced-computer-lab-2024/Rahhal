import express from 'express';
import activitiesController from '../controllers/activities-controller';

const router = express.Router();

// Activities routes

router.get('/activities', activitiesController.getAllActivities); // Get all activities
router.get('/activities/:id', activitiesController.getActivityById); // Get activity by id
router.post('/activities', activitiesController.createActivity); // Create a new activity
router.put('/activities/:id', activitiesController.updateActivity); // Update an existing activity
router.delete('/activities/:id', activitiesController.deleteActivity); // Delete an activity


module.exports = router;