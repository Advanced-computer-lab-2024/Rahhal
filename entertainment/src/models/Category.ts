import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
});

const Category = mongoose.model('Category', CategorySchema);

export { Category };