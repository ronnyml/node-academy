import express, { Request, Response, NextFunction } from 'express';
import compression from "compression";
import cors from "cors";
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';
import courseRoutes from './routes/course.routes';
import courseSectionRoutes from './routes/courseSection.routes';
import overviewRoutes from './routes/overview.routes';
import userRoutes from './routes/user.routes';
import { authenticate } from './middlewares/auth.middleware';
import { errorHandler } from './middlewares/error-handler.middleware';
import { requestIdMiddleware } from './middlewares/request-id.middleware';
import { generateSwaggerDocs, API_VERSION } from './config/swagger.config';
import logger from './config/logger';
import { publicLimiter, authLimiter, apiLimiter } from './config/rateLimiters';

const API_BASE_PATH = `/api/${API_VERSION}`;

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(compression());
app.use(requestIdMiddleware);


app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`, {
      ip: req.ip,
      body: req.method !== 'GET' ? req.body : undefined,
    });
  });
  next();
});

const swaggerDocs = generateSwaggerDocs();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get(`${API_BASE_PATH}/health`, publicLimiter, (req, res) => {
  logger.info('Health check requested');
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get(API_BASE_PATH, (req, res) => {
  logger.info('API root accessed');
  res.send('React Academy API');
});

app.use(`${API_BASE_PATH}/auth`, authLimiter, authRoutes);
app.use(`${API_BASE_PATH}/categories`, apiLimiter, authenticate, categoryRoutes);
app.use(`${API_BASE_PATH}/courses`, apiLimiter, authenticate, courseRoutes);
app.use(`${API_BASE_PATH}/course-sections`, apiLimiter, authenticate, courseSectionRoutes);
app.use(`${API_BASE_PATH}/overview`, apiLimiter, authenticate, overviewRoutes);
app.use(`${API_BASE_PATH}/users`, apiLimiter, authenticate, userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`${err.message} - ${req.method} ${req.originalUrl}`, { stack: err.stack });
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;