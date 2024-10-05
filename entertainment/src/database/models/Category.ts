import mongoose from 'mongoose';
import validateCategoryName from '../validators/category-validator';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    lowercase: true,
    required:[true, 'Name is required'],
    validate: {
      validator:validateCategoryName
    },
  }
});

const Category = mongoose.model('Category', CategorySchema);

 export default Category;