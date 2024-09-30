import express from 'express';
import activitiesRoutes from './router/activities-router';


const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/activities', activitiesRoutes);



export default app;