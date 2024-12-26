import express from 'express';

// Initialize Express app
const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Start server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 