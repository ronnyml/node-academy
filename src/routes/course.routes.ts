import express from 'express';
import {
  getCourses,
  getCourse,
  createNewCourse,
  updateCourseById,
  deleteCourseById,
} from '../controllers/course.controller';

const router = express.Router();

/**
 * @swagger
 * /courses:
 *   get:
 *     tags: [Courses]
 *     summary: Get all courses
 *     description: Retrieves a list of all courses with optional filters
 *     security:
 *       - authToken: []
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         type: integer
 *       - in: query
 *         name: teacherId
 *         type: integer
 *       - in: query
 *         name: search
 *         type: string
 *       - in: query
 *         name: page
 *         type: integer
 *       - in: query
 *         name: limit
 *         type: integer
 *     responses:
 *       200:
 *         description: List of courses
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Course'
 */
router.get('/', getCourses);

/**
 * @swagger
 * /courses:
 *   post:
 *     tags: [Courses]
 *     summary: Create a new course
 *     description: Adds a new course to the system
 *     security:
 *       - authToken: []
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - title
 *             - categoryId
 *             - teacherId
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             categoryId:
 *               type: integer
 *             teacherId:
 *               type: integer
 *             price:
 *               type: number
 *     responses:
 *       201:
 *         description: Course created
 *         schema:
 *           $ref: '#/definitions/Course'
 */
router.post('/', createNewCourse);

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     tags: [Courses]
 *     summary: Get course by ID
 *     description: Retrieves a specific course by its ID
 *     security:
 *       - authToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Course details
 *         schema:
 *           $ref: '#/definitions/Course'
 */
router.get('/:id', getCourse);

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     tags: [Courses]
 *     summary: Update course
 *     description: Updates an existing course
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
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             categoryId:
 *               type: integer
 *             teacherId:
 *               type: integer
 *             price:
 *               type: number
 *     responses:
 *       200:
 *         description: Updated course
 *         schema:
 *           $ref: '#/definitions/Course'
 */
router.put('/:id', updateCourseById);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     tags: [Courses]
 *     summary: Delete course
 *     description: Deletes a course by its ID
 *     security:
 *       - authToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Course deleted
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: 'Course deleted successfully'
 */
router.delete('/:id', deleteCourseById);

export default router;
