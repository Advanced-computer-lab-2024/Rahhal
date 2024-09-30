import express from 'express';
import mongoose from 'mongoose';
import activitiesRoutes from './routes/activities-routes';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/', activitiesRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://entertainment_database:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = app;
