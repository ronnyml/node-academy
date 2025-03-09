import express from 'express';
import {
  getCategories,
  getCategoryById,
  createNewCategory,
  updateCategoryById,
  deleteCategoryById,
} from '../controllers/category.controller';

const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(createNewCategory);

router.route('/:id')
  .get(getCategoryById)
  .put(updateCategoryById)
  .delete(deleteCategoryById);

export default router;
