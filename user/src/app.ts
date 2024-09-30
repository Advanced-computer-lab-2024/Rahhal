import express from "express";
import mongoose from "mongoose";
import userRoutes from "./router/user-routes";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/user", userRoutes);

// // Connect to MongoDB
// mongoose.connect("mongodb://user_database:27017", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// } as ConnectOptions);



mongoose.connect("mongodb://user_database:27017")
.then(()=>{
  console.log("MongoDB is now connected!")
})
.catch(err => console.log(err));



export default app;
