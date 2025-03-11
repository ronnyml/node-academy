import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser } from '../services/auth.service';
import { asyncHandler } from '../utils/async-handler.util';
import { BadRequestError } from '../types/error.types';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Email and password are required');
  }

  const user = await registerUser(email, password);
  res.status(201).json({
    success: true,
    data: user
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Email and password are required');
  }

  const token = await loginUser(email, password);
  res.status(200).json({
    success: true,
    data: { token }
  });
});