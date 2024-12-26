import express, { Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Welcome route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to SpeedBay API' });
});

// Routes
app.use('/api/auth', authRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 