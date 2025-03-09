import { Request, Response } from 'express';
import {
  getAllCourseSections,
  getCourseSection,
  createCourseSection as createCourseSectionService,
  updateCourseSection,
  deleteCourseSection,
} from '../services/courseSection.service';

export const getCourseSections = async (req: Request, res: Response) => {
  try {
    const { courseId, search, page, limit } = req.query;

    const sections = await getAllCourseSections(
      courseId ? Number(courseId) : undefined,
      search ? String(search) : undefined,
      page ? Number(page) : 1,
      limit ? Number(limit) : undefined
    );

    res.json(sections);
  } catch (error) {
    console.error("Error fetching course sections:", error);
    res.status(500).json({ message: "Error fetching course sections" });
  }
};

export const getCourseSectionById = async (req: Request, res: Response) => {
  try {
    const sectionId = parseInt(req.params.id, 10);
    const section = await getCourseSection(sectionId);
    res.json(section);
  } catch (error) {
    if ((error as Error).message === 'Invalid section ID') {
      res.status(400).json({ message: (error as Error).message });
    } else if ((error as Error).message === 'Section not found') {
      res.status(404).json({ message: (error as Error).message });
    } else {
      console.error('Error fetching course section:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const createNewCourseSection = async (req: Request, res: Response) => {
  try {
    const { courseId, title, description } = req.body;
    const section = await createCourseSectionService(courseId, title, description);
    res.status(201).json(section);
  } catch (error) {
    res.status(500).json({ message: 'Error creating course section' });
  }
};

export const updateCourseSectionById = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const section = await updateCourseSection(Number(req.params.id), title, description);
    res.json(section);
  } catch (error) {
    res.status(500).json({ message: 'Error updating course section' });
  }
};

export const deleteCourseSectionById = async (req: Request, res: Response) => {
  try {
    await deleteCourseSection(Number(req.params.id));
    res.json({ message: 'Course section deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course section' });
  }
};
