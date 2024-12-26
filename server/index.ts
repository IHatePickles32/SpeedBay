import express, { Request, Response } from 'express';

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Server is running!' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Try accessing: http://0.0.0.0:${port}`);
}); 