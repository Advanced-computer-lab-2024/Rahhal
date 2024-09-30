import express from "express";
import mongoose from "mongoose";
import userRoutes from "./router/user-routes";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/users", userRoutes);

// // Connect to MongoDB
// mongoose.connect("mongodb://user_database:27017", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// } as ConnectOptions);



mongoose.connect("mongodb://user_database:27017")
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
 app.listen("3000", () => {
    console.log(`Listening to requests on http://localhost:3000`);
  })
})
.catch(err => console.log(err));



module.exports = app;
