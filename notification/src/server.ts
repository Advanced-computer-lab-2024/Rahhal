import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
import NotificationWorker from "@/workers/notification-worker";
import EventReminderWorker from "@/workers/event-reminder-worker";
import AdminAlertWorker from "@/workers/admin-alert-worker";

dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDB() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
}

await connectToDB();
NotificationWorker.start();
EventReminderWorker.start();
AdminAlertWorker.start();

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
