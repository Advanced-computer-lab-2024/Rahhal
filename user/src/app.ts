import express from "express";
import mongoose from "mongoose";
import userRoutes from "./api/routes/user-routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
// Middleware
app.use(express.json());
// Routes
app.use("/users", userRoutes);

const URI = process.env.MONGODB_URI || '';

if (!URI) {
  throw new Error("MONGODB_URI environment variable is not set");
}

mongoose.connect(URI)
.then(()=>{
  console.log("MongoDB is now connected!")
})
.catch(err => console.log(err));



export default app;