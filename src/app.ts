import express from 'express';
import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';
import courseRoutes from './routes/course.routes';
import courseSectionRoutes from './routes/courseSection.routes';
import userRoutes from './routes/user.routes';
import { authenticate } from './middlewares/auth.middleware';

const app = express();

app.get('/api', (req, res) => {
  res.send('React Academy API');
});

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api/categories', authenticate, categoryRoutes);
app.use('/api/courses', authenticate, courseRoutes);
app.use('/api/course-sections', authenticate, courseSectionRoutes);
app.use('/api/users', authenticate, userRoutes);

export default app;
