import { Request, Response } from 'express';
import {
  getAllCourseSections,
  getCourseSection,
  createCourseSection as createCourseSectionService,
  updateCourseSection,
  deleteCourseSection,
} from '../services/courseSection.service';
import { asyncHandler } from '../utils/async-handler.util';
import { BadRequestError, NotFoundError, ValidationError } from '../types/error.types';

export const getCourseSections = asyncHandler(async (req: Request, res: Response) => {
  const { courseId, search, page, limit } = req.query;
  const pageNum = page ? Number(page) : 1;
  if (page && (isNaN(pageNum) || pageNum < 1)) {
    throw new BadRequestError('Page must be a positive number');
  }

  const limitNum = limit ? Number(limit) : 10;
  if (limit && (isNaN(limitNum) || limitNum < 1)) {
    throw new BadRequestError('Limit must be a positive number');
  }

  const courseIdNum = courseId ? Number(courseId) : undefined;
  const sections = await getAllCourseSections(
    courseIdNum,
    search ? String(search) : undefined,
    pageNum,
    limitNum
  );

  res.json({
    success: true,
    data: sections
  });
});

export const getCourseSectionById = asyncHandler(async (req: Request, res: Response) => {
  const sectionId = parseInt(req.params.id, 10);
  if (isNaN(sectionId)) {
    throw new BadRequestError('Invalid section ID');
  }

  const section = await getCourseSection(sectionId);
  if (!section) {
    throw new NotFoundError('Course section');
  }

  res.json({
    success: true,
    data: section
  });
});

export const createNewCourseSection = asyncHandler(async (req: Request, res: Response) => {
  const { courseId, title, description } = req.body;
  const errors: Record<string, string> = {};

  if (!courseId) errors.courseId = 'Course ID is required';
  if (!title) errors.title = 'Title is required';
  if (courseId && (isNaN(Number(courseId)) || Number(courseId) < 1)) {
    errors.courseId = 'Course ID must be a positive number';
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError(errors);
  }

  const section = await createCourseSectionService(
    Number(courseId),
    String(title),
    description ? String(description) : ''
  );

  res.status(201).json({
    success: true,
    data: section
  });
});

export const updateCourseSectionById = asyncHandler(async (req: Request, res: Response) => {
  const sectionId = Number(req.params.id);
  if (isNaN(sectionId)) {
    throw new BadRequestError('Invalid section ID');
  }

  const { title, description } = req.body;
  if (!title && description === undefined) {
    throw new BadRequestError('At least one field must be provided for update');
  }

  const titleStr = title !== undefined ? String(title) : undefined;
  const descriptionStr = description !== undefined ? String(description) : undefined;
  const section = await updateCourseSection(
    sectionId,
    titleStr,
    descriptionStr
  );

  if (!section) {
    throw new NotFoundError('Course section');
  }

  res.json({
    success: true,
    data: section
  });
});

export const deleteCourseSectionById = asyncHandler(async (req: Request, res: Response) => {
  const sectionId = Number(req.params.id);
  if (isNaN(sectionId)) {
    throw new BadRequestError('Invalid section ID');
  }

  const result = await deleteCourseSection(sectionId);
  if (!result) {
    throw new NotFoundError('Course section');
  }

  res.json({
    success: true,
    message: 'Course section deleted successfully'
  });
});