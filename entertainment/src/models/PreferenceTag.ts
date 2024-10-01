import mongoose from 'mongoose';

const PreferenceTagSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required:[true, 'Name is required'],
    validate: {
      validator: (name: string) => {
        return typeof name === 'string' && name.trim().length > 0;
      }
    }
  },
});

const PreferenceTag = mongoose.model('PreferenceTag', PreferenceTagSchema);

export { PreferenceTag };