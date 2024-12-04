import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cron from "node-cron";
import { hourlyUpdate, eventReminder } from "./utils/cronjobs";
// Load environment variables
dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDB() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("Connected to MongoDB");
    return true;
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    return false;
  }
}

const connected = await connectToDB();

if (connected) {
  hourlyUpdate();
  eventReminder();
  cron.schedule("0 * * * *", hourlyUpdate);
  cron.schedule("0 0 * * *", eventReminder);
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
