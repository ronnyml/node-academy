import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

declare module 'express' {
  interface Request {
    user?: {
      userId: number;
      role: string;
    };
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    res.status(401).json({ message: 'Access denied' });
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};
