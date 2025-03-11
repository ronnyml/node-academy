import { Request, Response } from 'express';
import {
  getOverviewStats,
  getTopCourses,
  getUserGrowthStats
} from '../services/overview.service';
import { asyncHandler } from '../utils/async-handler.util';

export const getOverview = asyncHandler(async (req: Request, res: Response) => {
  const stats = await getOverviewStats();

  res.json({
    success: true,
    data: stats
  });
});

export const getCourses = asyncHandler(async (req: Request, res: Response) => {
  const topCourses = await getTopCourses();

  res.json({
    success: true,
    data: topCourses
  });
});

export const getUserGrowth = asyncHandler(async (req: Request, res: Response) => {
  const growthData = await getUserGrowthStats();

  res.json({
    success: true,
    data: growthData
  });
});