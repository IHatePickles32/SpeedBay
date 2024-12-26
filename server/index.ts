import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to EMS Navigator API' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 