import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { AddressInfo } from 'net';

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Trust proxy settings
app.set('trust proxy', true);

// Enable CORS for all routes
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json());

// Basic request logging
app.use((req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log('Client IP:', req.ip);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    next();
  } catch (error) {
    console.error('Error in request logging:', error);
    next(error);
  }
});

// Welcome route
app.get('/', (req: Request, res: Response) => {
  try {
    console.log('Handling root request');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ 
      message: 'Server is running!',
      timestamp: new Date().toISOString(),
      clientIP: req.ip
    });
  } catch (error) {
    console.error('Error in root route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Test route
app.get('/ping', (req: Request, res: Response) => {
  try {
    console.log('Handling ping request');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ 
      pong: new Date().toISOString(),
      clientIP: req.ip,
      headers: req.headers
    });
  } catch (error) {
    console.error('Error in ping route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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

let server: any;
try {
  const options = {
    ipv6Only: false
  };

  server = app.listen(port, "::", options, () => {
    const address = server.address() as AddressInfo;
    console.log(`Server is running on port ${address.port}`);
    console.log('Server address:', address);
    console.log('Environment:', {
      PORT: process.env.PORT,
      NODE_ENV: process.env.NODE_ENV
    });
  });

  // Handle server errors
  server.on('error', (error: Error) => {
    console.error('Server error:', error);
  });

  // Handle graceful shutdown
  process.on('SIGTERM', () => {
    console.log('Received SIGTERM signal. Starting graceful shutdown...');
    server.close(() => {
      console.log('Server closed. Process will now exit.');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('Received SIGINT signal. Starting graceful shutdown...');
    server.close(() => {
      console.log('Server closed. Process will now exit.');
      process.exit(0);
    });
  });

} catch (error) {
  console.error('Failed to start server:', error);
  process.exit(1);
} 