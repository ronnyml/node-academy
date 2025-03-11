import express from 'express';
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';
import courseRoutes from './routes/course.routes';
import courseSectionRoutes from './routes/courseSection.routes';
import overviewRoutes from './routes/overview.routes';
import userRoutes from './routes/user.routes';
import { authenticate } from './middlewares/auth.middleware';
import { generateSwaggerDocs, API_VERSION } from './config/swagger.config';

const API_BASE_PATH = `/api/${API_VERSION}`;

const app = express();
app.use(cors());
app.use(express.json());

const swaggerDocs = generateSwaggerDocs();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get(`${API_BASE_PATH}/health`, (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get(API_BASE_PATH, (req, res) => {
  res.send('React Academy API');
});

app.use(`${API_BASE_PATH}/auth`, authRoutes);
app.use(`${API_BASE_PATH}/categories`, authenticate, categoryRoutes);
app.use(`${API_BASE_PATH}/courses`, authenticate, courseRoutes);
app.use(`${API_BASE_PATH}/course-sections`, authenticate, courseSectionRoutes);
app.use(`${API_BASE_PATH}/overview`, authenticate, overviewRoutes);
app.use(`${API_BASE_PATH}/users`, authenticate, userRoutes);

export default app;