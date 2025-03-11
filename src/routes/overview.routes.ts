import express from 'express';
import { getOverview, getCourses, getUserGrowth } from '../controllers/overview.controller';

const router = express.Router();

/**
 * @swagger
 * /overview:
 *   get:
 *     tags: [Overview]
 *     summary: Get overview statistics
 *     description: Retrieves platform overview statistics
 *     security:
 *       - authToken: []
 *     responses:
 *       200:
 *         description: Overview statistics
 *         schema:
 *           type: object
 */
router.get('/', getOverview);

/**
 * @swagger
 * /overview/courses:
 *   get:
 *     tags: [Overview]
 *     summary: Get top courses
 *     description: Retrieves a list of top courses
 *     security:
 *       - authToken: []
 *     responses:
 *       200:
 *         description: List of top courses
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Course'
 */
router.get('/courses', getCourses);

/**
 * @swagger
 * /overview/growth:
 *   get:
 *     tags: [Overview]
 *     summary: Get user growth statistics
 *     description: Retrieves user growth data
 *     security:
 *       - authToken: []
 *     responses:
 *       200:
 *         description: User growth data
 *         schema:
 *           type: object
 */
router.get('/growth', getUserGrowth);

export default router;