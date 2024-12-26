import express, { Request, Response, Router } from 'express';

// Define user interface
interface User {
  email: string;
  password: string;
  createdAt: Date;
}

const router = Router();

// In-memory user storage (replace with database later)
const users: User[] = [];

// Register route
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Create new user
    const newUser: User = {
      email,
      password, // TODO: Hash password before storing
      createdAt: new Date()
    };
    users.push(newUser);

    console.log('User registered:', { email, timestamp: new Date().toISOString() });
    res.status(201).json({ 
      message: 'User registered successfully',
      email,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login route
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user and verify password
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('User logged in:', { email, timestamp: new Date().toISOString() });
    res.status(200).json({ 
      message: 'Login successful',
      email,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
});

// Logout route
router.post('/logout', (req: Request, res: Response) => {
  // In a real app, you'd invalidate the user's session/token here
  console.log('Logout request:', { timestamp: new Date().toISOString() });
  res.status(200).json({ 
    message: 'Logged out successfully',
    timestamp: new Date().toISOString()
  });
});

export default router; 