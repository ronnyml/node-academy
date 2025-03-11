import rateLimit from 'express-rate-limit';

// Public endpoints limiter (e.g., /health, /api/v1/)
export const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests from this IP, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Authentication endpoints limiter (e.g., /api/v1/auth)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { error: 'Too many authentication attempts, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Protected API endpoints limiter (e.g., /categories, /courses)
export const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 500,
  message: { error: 'Too many requests from this IP, please try again after an hour' },
  standardHeaders: true,
  legacyHeaders: false,
});