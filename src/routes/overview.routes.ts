import express from 'express';
import { getOverview, getCourses } from '../controllers/overview.controller';

const router = express.Router();

router.route('/')
  .get(getOverview);

router.route('/courses')
  .get(getCourses);

export default router;