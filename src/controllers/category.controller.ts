import { Request, Response } from 'express';
import {
  getAllCategories,
  getCategory,
  createCategory as createCategoryService,
  updateCategory,
  deleteCategory,
} from '../services/category.service';
import { asyncHandler } from '../utils/async-handler.util';
import { BadRequestError, NotFoundError } from '../types/error.types';

export const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = await getAllCategories();
  res.json({
    success: true,
    data: categories
  });
});

export const getCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id, 10);
  if (isNaN(categoryId)) {
    throw new BadRequestError('Invalid category ID');
  }

  const category = await getCategory(categoryId);
  if (!category) {
    throw new NotFoundError('Category');
  }

  res.json({
    success: true,
    data: category
  });
});

export const createNewCategory = asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.body;
  if (!name) {
    throw new BadRequestError('Category name is required');
  }

  const category = await createCategoryService(name, description);
  res.status(201).json({
    success: true,
    data: category
  });
});

export const updateCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const categoryId = Number(req.params.id);
  if (isNaN(categoryId)) {
    throw new BadRequestError('Invalid category ID');
  }

  const { name, description } = req.body;
  const category = await updateCategory(categoryId, name, description);

  if (!category) {
    throw new NotFoundError('Category');
  }

  res.json({
    success: true,
    data: category
  });
});

export const deleteCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const categoryId = Number(req.params.id);
  if (isNaN(categoryId)) {
    throw new BadRequestError('Invalid category ID');
  }

  const result = await deleteCategory(categoryId);
  if (!result) {
    throw new NotFoundError('Category');
  }

  res.json({
    success: true,
    message: 'Category deleted successfully'
  });
});