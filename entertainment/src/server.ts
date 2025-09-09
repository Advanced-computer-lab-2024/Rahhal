import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || "3000";
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://entertainment_database";

async function connectToDB() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
}

await connectToDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
