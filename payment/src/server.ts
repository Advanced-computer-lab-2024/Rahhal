import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cron from "node-cron";
import dailyUpdate from "@/utils/cronjobs";

dotenv.config();

const PORT = process.env.PORT || "3000";
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://payment_database";

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
  dailyUpdate();
  cron.schedule("0 0 * * *", dailyUpdate);
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
