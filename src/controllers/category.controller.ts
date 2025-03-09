import { Request, Response } from 'express';
import {
  getAllCategories,
  getCategory,
  createCategory as createCategoryService,
  updateCategory,
  deleteCategory,
} from '../services/category.service';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const categoryId = parseInt(req.params.id, 10);
    const category = await getCategory(categoryId);
    res.json(category);
  } catch (error) {
    if ((error as Error).message === 'Invalid category ID') {
      const err = error as Error;
      res.status(400).json({ message: err.message });
    }
    if ((error as Error).message === 'Category not found') {
      const err = error as Error;
      res.status(404).json({ message: err.message });
    }
    console.error('Error fetching category:', error as Error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createNewCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const category = await createCategoryService(name, description);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category' });
  }
};

export const updateCategoryById = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const category = await updateCategory(Number(req.params.id), name, description);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error updating category' });
  }
};

export const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    await deleteCategory(Number(req.params.id));
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category' });
  }
};
