import express from 'express';
import * as categoryController from '../controllers/category-controller';

const router = express.Router();

router.put('/:id',categoryController.updateCategory);
router.delete('/:id',categoryController.deleteCategory);
router.post('/',categoryController.createCategory);
router.get('/',categoryController.getCategories);

export default router;