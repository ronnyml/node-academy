import { Request, Response } from "express";
import {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../services/user.service";
import { asyncHandler } from '../utils/async-handler.util';
import { BadRequestError, NotFoundError, ValidationError } from '../types/error.types';

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const { email, firstName, lastName, roleId, page, limit } = req.query;
  const pageNum = page ? Number(page) : 1;
  if (page && (isNaN(pageNum) || pageNum < 1)) {
    throw new BadRequestError('Page must be a positive number');
  }

  const limitNum = limit ? Number(limit) : 10;
  if (limit && (isNaN(limitNum) || limitNum < 1)) {
    throw new BadRequestError('Limit must be a positive number');
  }

  const roleIdNum = Number(roleId);
  if (roleId && (isNaN(roleIdNum) || roleIdNum < 1)) {
    throw new BadRequestError('Role ID must be a positive number');
  }

  const users = await getAllUsers(
    email ? String(email) : undefined,
    firstName ? String(firstName) : undefined,
    lastName ? String(lastName) : undefined,
    roleIdNum,
    pageNum,
    limitNum
  );

  res.json({
    success: true,
    data: users
  });
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  if (isNaN(userId)) {
    throw new BadRequestError('Invalid user ID');
  }

  const user = await getUserById(userId);
  if (!user) {
    throw new NotFoundError('User');
  }

  res.json({
    success: true,
    data: user
  });
});

export const createNewUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, roleId } = req.body;
  const errors: Record<string, string> = {};

  if (!email) errors.email = 'Email is required';
  if (!password) errors.password = 'Password is required';

  if (roleId !== undefined && (isNaN(Number(roleId)) || Number(roleId) < 1)) {
    errors.roleId = 'Role ID must be a positive number';
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError(errors);
  }

  const roleIdNum = roleId ? Number(roleId) : undefined;
  const newUser = await createUser(
    String(email),
    String(password),
    firstName ? String(firstName) : undefined,
    lastName ? String(lastName) : undefined,
    roleIdNum
  );

  res.status(201).json({
    success: true,
    data: newUser
  });
});

export const updateUserById = asyncHandler(async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  if (isNaN(userId)) {
    throw new BadRequestError('Invalid user ID');
  }

  const { email, password, firstName, lastName, roleId } = req.body;
  const errors: Record<string, string> = {};

  if (roleId !== undefined && (isNaN(Number(roleId)) || Number(roleId) < 1)) {
    errors.roleId = 'Role ID must be a positive number';
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError(errors);
  }

  if (!email && !password && !firstName && !lastName && roleId === undefined) {
    throw new BadRequestError('At least one field must be provided for update');
  }

  const emailStr = email !== undefined ? String(email) : undefined;
  const passwordStr = password !== undefined ? String(password) : undefined;
  const firstNameStr = firstName !== undefined ? String(firstName) : undefined;
  const lastNameStr = lastName !== undefined ? String(lastName) : undefined;
  const roleIdNum = roleId !== undefined ? Number(roleId) : undefined;

  const updatedUser = await updateUser(
    userId,
    emailStr,
    passwordStr,
    firstNameStr,
    lastNameStr,
    roleIdNum
  );

  if (!updatedUser) {
    throw new NotFoundError('User');
  }

  res.json({
    success: true,
    data: updatedUser
  });
});

export const deleteUserById = asyncHandler(async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  if (isNaN(userId)) {
    throw new BadRequestError('Invalid user ID');
  }

  const result = await deleteUser(userId);
  if (!result) {
    throw new NotFoundError('User');
  }

  res.json({
    success: true,
    message: 'User deleted successfully'
  });
});