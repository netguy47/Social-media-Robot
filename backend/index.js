import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import v1Router from './routes/v1/index.js';
import connectDB from './config/database.js';

connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Social Media Robot API');
});

app.use('/api/v1', v1Router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
