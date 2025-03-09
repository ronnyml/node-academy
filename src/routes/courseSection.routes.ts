import express from 'express';
import {
  getCourseSections,
  getCourseSectionById,
  createNewCourseSection,
  updateCourseSectionById,
  deleteCourseSectionById,
} from '../controllers/courseSection.controller';

const router = express.Router();

router.route('/')
  .get(getCourseSections)
  .post(createNewCourseSection);

router.route('/:id')
  .get(getCourseSectionById)
  .put(updateCourseSectionById)
  .delete(deleteCourseSectionById);

export default router;
