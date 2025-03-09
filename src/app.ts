import express from 'express';
import authRoutes from './routes/auth.routes';
import { authenticate } from './middlewares/auth.middleware';

const app = express();

app.get('/api', (req, res) => {
  res.send('React Academy API');
});

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api', authenticate);

export default app;
