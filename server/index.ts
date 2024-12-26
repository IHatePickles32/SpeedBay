import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

// Enable CORS for all routes
app.use(cors());

// Basic request logging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Welcome route
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Server is running!',
    timestamp: new Date().toISOString()
  });
});

// Test route
app.get('/ping', (req: Request, res: Response) => {
  res.json({ pong: new Date().toISOString() });
});

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Try accessing: http://0.0.0.0:${port}`);
});

// Handle server errors
server.on('error', (error: Error) => {
  console.error('Server error:', error);
}); 