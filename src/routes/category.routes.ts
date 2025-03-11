import express from 'express';
import {
  getCategories,
  getCategoryById,
  createNewCategory,
  updateCategoryById,
  deleteCategoryById,
} from '../controllers/category.controller';

const router = express.Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     tags: [Categories]
 *     summary: Get all categories
 *     description: Retrieves a list of all categories
 *     security:
 *       - authToken: []
 *     responses:
 *       200:
 *         description: List of categories
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Category'
 */
router.get('/', getCategories);

/**
 * @swagger
 * /categories:
 *   post:
 *     tags: [Categories]
 *     summary: Create a new category
 *     description: Adds a new category to the system
 *     security:
 *       - authToken: []
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - name
 *           properties:
 *             name:
 *               type: string
 *             description:
 *               type: string
 *     responses:
 *       201:
 *         description: Category created
 *         schema:
 *           $ref: '#/definitions/Category'
 */
router.post('/', createNewCategory);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     tags: [Categories]
 *     summary: Get category by ID
 *     description: Retrieves a specific category by its ID
 *     security:
 *       - authToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Category details
 *         schema:
 *           $ref: '#/definitions/Category'
 */
router.get('/:id', getCategoryById);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     tags: [Categories]
 *     summary: Update category
 *     description: Updates an existing category
 *     security:
 *       - authToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             description:
 *               type: string
 *     responses:
 *       200:
 *         description: Updated category
 *         schema:
 *           $ref: '#/definitions/Category'
 */
router.put('/:id', updateCategoryById);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     tags: [Categories]
 *     summary: Delete category
 *     description: Deletes a category by its ID
 *     security:
 *       - authToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Category deleted
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: 'Category deleted successfully'
 */
router.delete('/:id', deleteCategoryById);

export default router;
