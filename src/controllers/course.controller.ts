import { Request, Response } from 'express';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../services/course.service';

export const getCourses = async (req: Request, res: Response) => {
  try {
    const { categoryId, teacherId, search, page, limit } = req.query;
    const courses = await getAllCourses(
      categoryId ? Number(categoryId) : undefined,
      teacherId ? Number(teacherId) : undefined,
      search ? String(search) : undefined,
      page ? Number(page) : 1,
      limit ? Number(limit) : undefined
    );
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses' });
  }
};

export const getCourse = async (req: Request, res: Response) => {
  try {
    const courseId = parseInt(req.params.id, 10);
    const course = await getCourseById(courseId);
    res.json(course);
  } catch (error) {
    res.status(404).json({ message: 'Course not found' });
  }
};

export const createNewCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, categoryId, teacherId, price } = req.body;
    const course = await createCourse(title, description, categoryId, teacherId, price);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error creating course' });
  }
};

export const updateCourseById = async (req: Request, res: Response) => {
  try {
    const { title, description, categoryId, teacherId, price } = req.body;
    const course = await updateCourse(Number(req.params.id), title, description, categoryId, teacherId, price);
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error updating course' });
  }
};

export const deleteCourseById = async (req: Request, res: Response) => {
  try {
    await deleteCourse(Number(req.params.id));
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course' });
  }
};
