import mongoose from "mongoose";
import { validateStringNotEmpty } from "../shared";

const PreferenceTagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Preference Tag name is required"],
    unique: true,
    validate: {
      validator: validateStringNotEmpty,
      message: "Preference Tag name must not be empty",
    },
  },
});

const PreferenceTag = mongoose.model("PreferenceTag", PreferenceTagSchema);

export default PreferenceTag;
