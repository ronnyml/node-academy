import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const requestIdMiddleware = (
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {
  // Generate a unique ID for each request
  req.id = req.headers['x-request-id'] as string || uuidv4();
  
  // Add the request ID to response headers
  res.setHeader('X-Request-ID', req.id);
  
  next();
};

export default requestIdMiddleware;