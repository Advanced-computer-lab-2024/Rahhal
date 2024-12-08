import sendEmails from "@/utils/cronjobs";
import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cron from "node-cron";
dotenv.config();
const PORT = process.env.PORT;
if (!PORT) {
  throw new Error("Port is not defined in .env file");
}

const URI = process.env.MONGODB_URI || "";

if (!URI) {
  throw new Error("MONGODB_URI environment variable is not set");
}

mongoose
  .connect(URI)
  .then(() => {
    console.log("MongoDB is now connected!");
  })
  .catch((err) => console.log(err));

sendEmails();
cron.schedule("0 0 * * *", sendEmails);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
