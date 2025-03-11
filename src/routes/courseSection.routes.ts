import express from 'express';
import {
  getCourseSections,
  getCourseSectionById,
  createNewCourseSection,
  updateCourseSectionById,
  deleteCourseSectionById,
} from '../controllers/courseSection.controller';

const router = express.Router();

/**
 * @swagger
 * /course-sections:
 *   get:
 *     tags: [Course Sections]
 *     summary: Get all course sections
 *     description: Retrieves a list of all course sections with optional filters
 *     security:
 *       - authToken: []
 *     parameters:
 *       - in: query
 *         name: courseId
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
 *         description: List of course sections
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/CourseSection'
 */
router.get('/', getCourseSections);

/**
 * @swagger
 * /course-sections:
 *   post:
 *     tags: [Course Sections]
 *     summary: Create a new course section
 *     description: Adds a new section to a course
 *     security:
 *       - authToken: []
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - courseId
 *             - title
 *           properties:
 *             courseId:
 *               type: integer
 *             title:
 *               type: string
 *             description:
 *               type: string
 *     responses:
 *       201:
 *         description: Course section created
 *         schema:
 *           $ref: '#/definitions/CourseSection'
 */
router.post('/', createNewCourseSection);

/**
 * @swagger
 * /course-sections/{id}:
 *   get:
 *     tags: [Course Sections]
 *     summary: Get course section by ID
 *     description: Retrieves a specific course section by its ID
 *     security:
 *       - authToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Course section details
 *         schema:
 *           $ref: '#/definitions/CourseSection'
 */
router.get('/:id', getCourseSectionById);

/**
 * @swagger
 * /course-sections/{id}:
 *   put:
 *     tags: [Course Sections]
 *     summary: Update course section
 *     description: Updates an existing course section
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
 *     responses:
 *       200:
 *         description: Updated course section
 *         schema:
 *           $ref: '#/definitions/CourseSection'
 */
router.put('/:id', updateCourseSectionById);

/**
 * @swagger
 * /course-sections/{id}:
 *   delete:
 *     tags: [Course Sections]
 *     summary: Delete course section
 *     description: Deletes a course section by its ID
 *     security:
 *       - authToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Course section deleted
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: 'Course section deleted successfully'
 */
router.delete('/:id', deleteCourseSectionById);

export default router;
