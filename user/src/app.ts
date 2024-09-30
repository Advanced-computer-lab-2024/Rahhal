import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './router/user-routes';
const app = express();
// Middleware
app.use(express.json());
// Routes
app.use('/user', userRoutes);
// Connect to MongoDB
mongoose.connect('mongodb://entertainment_database:27017')
.then(() => {
    console.log('Connected to MongoDB');
    }
)
.catch((err) => {
    console.log(err);
});
export default app;