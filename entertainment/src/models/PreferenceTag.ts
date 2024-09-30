import mongoose from 'mongoose';

const PreferenceTagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const PreferenceTag = mongoose.model('PreferenceTag', PreferenceTagSchema);

export { PreferenceTag };