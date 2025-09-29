import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const PORT = process.env.PORT || "3000";
const URI = process.env.MONGODB_URI || "mongodb://authentication_database";

if (!URI) {
  throw new Error("MONGODB_URI environment variable is not set");
}

mongoose
  .connect(URI)
  .then(() => {
    console.log("MongoDB is now connected!");
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
