import request from 'supertest';
import express from 'express';
import {
  getCategories,
  getCategoryById,
  createNewCategory,
  updateCategoryById,
  deleteCategoryById,
} from '../category.controller';
import {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../services/category.service';


jest.mock('../../services/category.service');


const app = express();
app.use(express.json());
app.get('/categories', getCategories);
app.get('/categories/:id', getCategoryById);
app.post('/categories', createNewCategory);
app.put('/categories/:id', updateCategoryById);
app.delete('/categories/:id', deleteCategoryById);

describe('Category Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /categories', () => {
    it('should return all categories with 200 status', async () => {
      const mockCategories = [{ id: 1, name: 'Cat1' }, { id: 2, name: 'Cat2' }];
      (getAllCategories as jest.Mock).mockResolvedValue(mockCategories);

      const response = await request(app).get('/categories');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        data: mockCategories,
      });
      expect(getAllCategories).toHaveBeenCalled();
    });

    it('should handle service errors and return 500 status', async () => {
      (getAllCategories as jest.Mock).mockRejectedValue(new Error('Service error'));

      const response = await request(app).get('/categories');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({});
    });
  });

  describe('GET /categories/:id', () => {
    it('should return a category by ID with 200 status', async () => {
      const mockCategory = { id: 1, name: 'Cat1' };
      (getCategory as jest.Mock).mockResolvedValue(mockCategory);

      const response = await request(app).get('/categories/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        data: mockCategory,
      });
      expect(getCategory).toHaveBeenCalledWith(1);
    });

    it('should return 400 for invalid category ID', async () => {
      const response = await request(app).get('/categories/invalid');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({});
      expect(getCategory).not.toHaveBeenCalled();
    });

    it('should return 404 if category is not found', async () => {
      (getCategory as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/categories/1');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({});
      expect(getCategory).toHaveBeenCalledWith(1);
    });
  });

  describe('POST /categories', () => {
    it('should create a category and return 201 status', async () => {
      const mockCategory = { id: 1, name: 'NewCat' };
      (createCategory as jest.Mock).mockResolvedValue(mockCategory);

      const response = await request(app)
        .post('/categories')
        .send({ name: 'NewCat', description: 'A new category' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        success: true,
        data: mockCategory,
      });
      expect(createCategory).toHaveBeenCalledWith('NewCat', 'A new category');
    });

    it('should return 400 if name is missing', async () => {
      const response = await request(app)
        .post('/categories')
        .send({ description: 'A new category' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({});
      expect(createCategory).not.toHaveBeenCalled();
    });

    it('should handle service errors and return 500 status', async () => {
      (createCategory as jest.Mock).mockRejectedValue(new Error('Service error'));

      const response = await request(app)
        .post('/categories')
        .send({ name: 'NewCat', description: 'A new category' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({});
    });
  });

  describe('PUT /categories/:id', () => {
    it('should update a category and return 200 status', async () => {
      const mockCategory = { id: 1, name: 'UpdatedCat' };
      (updateCategory as jest.Mock).mockResolvedValue(mockCategory);

      const response = await request(app)
        .put('/categories/1')
        .send({ name: 'UpdatedCat', description: 'Updated desc' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        data: mockCategory,
      });
      expect(updateCategory).toHaveBeenCalledWith(1, 'UpdatedCat', 'Updated desc');
    });

    it('should return 400 for invalid category ID', async () => {
      const response = await request(app)
        .put('/categories/invalid')
        .send({ name: 'UpdatedCat' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({});
      expect(updateCategory).not.toHaveBeenCalled();
    });

    it('should return 404 if category is not found', async () => {
      (updateCategory as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .put('/categories/1')
        .send({ name: 'UpdatedCat' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({});
      expect(updateCategory).toHaveBeenCalledWith(1, 'UpdatedCat', undefined);
    });
  });

  describe('DELETE /categories/:id', () => {
    it('should delete a category and return 200 status', async () => {
      (deleteCategory as jest.Mock).mockResolvedValue(true);

      const response = await request(app).delete('/categories/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        message: 'Category deleted successfully',
      });
      expect(deleteCategory).toHaveBeenCalledWith(1);
    });

    it('should return 400 for invalid category ID', async () => {
      const response = await request(app).delete('/categories/invalid');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({});
      expect(deleteCategory).not.toHaveBeenCalled();
    });

    it('should return 404 if category is not found', async () => {
      (deleteCategory as jest.Mock).mockResolvedValue(false);

      const response = await request(app).delete('/categories/1');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({});
      expect(deleteCategory).toHaveBeenCalledWith(1);
    });
  });
});