import { Request, Response } from 'express';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../services/course.service';
import { asyncHandler } from '../utils/async-handler.util';
import { BadRequestError, NotFoundError, ValidationError } from '../types/error.types';

export const getCourses = asyncHandler(async (req: Request, res: Response) => {
  const { categoryId, teacherId, search, page, limit } = req.query;
  const pageNum = page ? Number(page) : 1;
  if (page && (isNaN(pageNum) || pageNum < 1)) {
    throw new BadRequestError('Page must be a positive number');
  }

  const limitNum = limit ? Number(limit) : 10;
  if (limit && (isNaN(limitNum) || limitNum < 1)) {
    throw new BadRequestError('Limit must be a positive number');
  }

  const categoryIdNum = categoryId ? Number(categoryId) : undefined;
  const teacherIdNum = teacherId ? Number(teacherId) : undefined;
  const courses = await getAllCourses(
    categoryIdNum,
    teacherIdNum,
    search ? String(search) : undefined,
    pageNum,
    limitNum
  );

  res.json({
    success: true,
    data: courses
  });
});

export const getCourse = asyncHandler(async (req: Request, res: Response) => {
  const courseId = parseInt(req.params.id, 10);
  if (isNaN(courseId)) {
    throw new BadRequestError('Invalid course ID');
  }

  const course = await getCourseById(courseId);
  if (!course) {
    throw new NotFoundError('Course');
  }

  res.json({
    success: true,
    data: course
  });
});

export const createNewCourse = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, categoryId, teacherId, price } = req.body;
  const errors: Record<string, string> = {};
  if (!title) errors.title = 'Title is required';
  if (!categoryId) errors.categoryId = 'Category ID is required';
  if (!teacherId) errors.teacherId = 'Teacher ID is required';
  if (price !== undefined && (isNaN(Number(price)) || Number(price) < 0)) {
    errors.price = 'Price must be a non-negative number';
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError(errors);
  }

  const priceNum = price !== undefined ? Number(price) : 0;
  const course = await createCourse(
    String(title),
    description ? String(description) : '',
    Number(categoryId),
    Number(teacherId),
    priceNum
  );

  res.status(201).json({
    success: true,
    data: course
  });
});

export const updateCourseById = asyncHandler(async (req: Request, res: Response) => {
  const courseId = Number(req.params.id);
  if (isNaN(courseId)) {
    throw new BadRequestError('Invalid course ID');
  }

  const { title, description, categoryId, teacherId, price } = req.body;
  const errors: Record<string, string> = {};

  if (categoryId !== undefined && (isNaN(Number(categoryId)) || Number(categoryId) < 1)) {
    errors.categoryId = 'Category ID must be a positive number';
  }

  if (teacherId !== undefined && (isNaN(Number(teacherId)) || Number(teacherId) < 1)) {
    errors.teacherId = 'Teacher ID must be a positive number';
  }

  if (price !== undefined && (isNaN(Number(price)) || Number(price) < 0)) {
    errors.price = 'Price must be a non-negative number';
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError(errors);
  }

  const titleStr = title !== undefined ? String(title) : undefined;
  const descriptionStr = description !== undefined ? String(description) : undefined;
  const categoryIdNum = categoryId !== undefined ? Number(categoryId) : undefined;
  const teacherIdNum = teacherId !== undefined ? Number(teacherId) : undefined;
  const priceNum = price !== undefined ? Number(price) : undefined;

  const course = await updateCourse(
    courseId,
    titleStr,
    descriptionStr,
    categoryIdNum,
    teacherIdNum,
    priceNum
  );

  if (!course) {
    throw new NotFoundError('Course');
  }

  res.json({
    success: true,
    data: course
  });
});

export const deleteCourseById = asyncHandler(async (req: Request, res: Response) => {
  const courseId = Number(req.params.id);
  if (isNaN(courseId)) {
    throw new BadRequestError('Invalid course ID');
  }

  const result = await deleteCourse(courseId);
  if (!result) {
    throw new NotFoundError('Course');
  }

  res.json({
    success: true,
    message: 'Course deleted successfully'
  });
});