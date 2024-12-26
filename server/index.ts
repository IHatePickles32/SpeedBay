import express from 'express';
import authRoutes from './routes/auth';

// Initialize Express app
const app = express();
const port = 3000;

// Parse JSON bodies
app.use(express.json());

// Debug logging middleware
app.use((req, res, next) => {
  console.log('Incoming request:', {
    method: req.method,
    path: req.path,
    headers: req.headers
  });
  next();
});

// Basic route
app.get('/', (req, res) => {
  console.log('Handling root request');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.json({ message: 'Server is running!' });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Start server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Server environment:', {
    port,
    nodeEnv: process.env.NODE_ENV,
    railwayEnv: process.env.RAILWAY_ENVIRONMENT_NAME
  });
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
  });
}); 