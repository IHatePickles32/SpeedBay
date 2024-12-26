import express, { Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

// Middleware
app.use(cors());
app.use(express.json());

// Welcome route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to SpeedBay API' });
});

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
}); 