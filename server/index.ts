import express, { Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  console.log('Health check endpoint called');
  res.status(200).json({ status: 'healthy' });
});

// Welcome route
app.get('/', (req: Request, res: Response) => {
  console.log('Welcome endpoint called');
  res.json({ message: 'Welcome to SpeedBay API' });
});

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('Error occurred:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
console.log('Starting server...');
console.log('PORT environment variable:', process.env.PORT);
console.log('Using port:', port);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
}); 