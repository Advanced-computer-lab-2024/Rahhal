import mongoose from 'mongoose';

const PreferenceTagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Preference Tag name is required'],
    unique: [true, 'Preference tag already exists'],
  },
});

const PreferenceTag = mongoose.model('PreferenceTag', PreferenceTagSchema);

export default PreferenceTag;