import express from 'express';
import {
  getUsers,
  getUser,
  createNewUser,
  updateUserById,
  deleteUserById,
} from '../controllers/user.controller';

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     description: Retrieves a list of all users with optional filters
 *     security:
 *       - authToken: []
 *     parameters:
 *       - in: query
 *         name: email
 *         type: string
 *       - in: query
 *         name: firstName
 *         type: string
 *       - in: query
 *         name: lastName
 *         type: string
 *       - in: query
 *         name: roleId
 *         type: integer
 *       - in: query
 *         name: page
 *         type: integer
 *       - in: query
 *         name: limit
 *         type: integer
 *     responses:
 *       200:
 *         description: List of users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 */
router.get('/', getUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Create a new user
 *     description: Adds a new user to the system
 *     security:
 *       - authToken: []
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             roleId:
 *               type: integer
 *     responses:
 *       201:
 *         description: User created
 *         schema:
 *           $ref: '#/definitions/User'
 *       400:
 *         description: Bad request - Email and password are required
 */
router.post('/', createNewUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by ID
 *     description: Retrieves a specific user by their ID
 *     security:
 *       - authToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: User details
 *         schema:
 *           $ref: '#/definitions/User'
 *       404:
 *         description: User not found
 */
router.get('/:id', getUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Update user
 *     description: Updates an existing user
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
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             roleId:
 *               type: integer
 *     responses:
 *       200:
 *         description: Updated user
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.put('/:id', updateUserById);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete user
 *     description: Deletes a user by their ID
 *     security:
 *       - authToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: User deleted
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: 'User deleted successfully'
 */
router.delete('/:id', deleteUserById);

export default router;
