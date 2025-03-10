import { Request, Response } from 'express';
import { getOverviewStats, getTopCourses } from '../services/overview.service';

export const getOverview = async (req: Request, res: Response) => {
  try {
    const stats = await getOverviewStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching overview stats:', error);
    res.status(500).json({ message: 'Error fetching overview stats' });
  }
};

export const getCourses = async (req: Request, res: Response) => {
  try {
    const topCourses = await getTopCourses();
    res.json(topCourses);
  } catch (error) {
    console.error('Error fetching top courses:', error);
    res.status(500).json({ message: 'Error fetching top courses' });
  }
};