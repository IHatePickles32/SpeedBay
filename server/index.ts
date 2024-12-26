import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

// Trust proxy settings
app.set('trust proxy', true);

// Enable CORS for all routes
app.use(cors({
  origin: true,
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Basic request logging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

// Welcome route
app.get('/', (req: Request, res: Response) => {
  console.log('Handling root request');
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ 
    message: 'Server is running!',
    timestamp: new Date().toISOString()
  });
});

// Test route
app.get('/ping', (req: Request, res: Response) => {
  console.log('Handling ping request');
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ 
    pong: new Date().toISOString(),
    headers: req.headers
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  console.log(`404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ error: 'Not Found' });
});

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Environment:', {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV
  });
});

// Handle server errors
server.on('error', (error: Error) => {
  console.error('Server error:', error);
  process.exit(1);
}); 