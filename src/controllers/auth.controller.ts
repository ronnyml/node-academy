import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  const user = await registerUser(email, password);
  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await loginUser(email, password);
  res.status(200).json({ token });
};
