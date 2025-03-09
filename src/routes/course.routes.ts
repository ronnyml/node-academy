import express from 'express';
import {
  getCourses,
  getCourse,
  createNewCourse,
  updateCourseById,
  deleteCourseById,
} from '../controllers/course.controller';

const router = express.Router();

router.route('/')
  .get(getCourses)
  .post(createNewCourse);

router.route('/:id')
  .get(getCourse)
  .put(updateCourseById)
  .delete(deleteCourseById);

export default router;
