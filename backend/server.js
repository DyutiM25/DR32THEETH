import express from 'express';
import connectDB from './config/db.js';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';


dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cors({
  origin: true, // your frontend URL (React dev server)
  credentials: true, // ✅ allow cookies (accessToken/refreshToken)
}));
app.use(morgan('dev'));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('API is running...');
  });

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



