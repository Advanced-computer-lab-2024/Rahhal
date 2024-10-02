import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    lowercase: true,
    required:[true, 'Name is required'],
    validate: {
      validator: (name: string) => {
        return typeof name === 'string' && name.trim().length > 0;
      }
    },
  }
});

const Category = mongoose.model('Category', CategorySchema);

export { Category };