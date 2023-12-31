import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import userRoute from './routes/user/user.route';
import jobRoute from './routes/job/job.route';

import connectDB from './config/db';

connectDB();
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use('/api/users', userRoute);
app.use('/api/jobs/', jobRoute);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
