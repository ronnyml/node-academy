import express from 'express';
import { getOverview, getCourses, getUserGrowth } from '../controllers/overview.controller';

const router = express.Router();

router.route('/')
  .get(getOverview);

router.route('/courses')
  .get(getCourses);

router.route('/growth')
  .get(getUserGrowth);

export default router;