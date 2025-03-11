import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/error.types';

declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`${req.method} ${req.path} - Error:`, err);
  
  let statusCode = 500;
  let errorResponse: any = {
    message: 'Internal server error',
    success: false
  };
  
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    errorResponse.message = err.message;
    
    if ('errors' in err) {
      errorResponse.errors = err.errors;
    }
    
    if (process.env.NODE_ENV === 'development') {
      errorResponse.stack = err.stack;
    }
  } else if (err.name === 'SyntaxError') {
    statusCode = 400;
    errorResponse.message = 'Invalid JSON';
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    errorResponse.message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    errorResponse.message = 'Token expired';
  } else {
    if (process.env.NODE_ENV !== 'development') {
      errorResponse.message = 'Internal server error';
    } else {
      errorResponse.message = err.message;
      errorResponse.stack = err.stack;
    }
  }
  
  if (req.id) {
    errorResponse.requestId = req.id;
  }
  
  res.status(statusCode).json(errorResponse);
};