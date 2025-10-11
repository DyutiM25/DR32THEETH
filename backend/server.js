import express from 'express';
import connectDB from './config/db.js';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path'; 

import authRoutes from './routes/authRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';


dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();


app.use(express.json());
if(process.env.NODE_ENV === 'development'){
  app.use(cors({
  origin: "http://localhost:5173", // your frontend URL (React dev server)
  credentials: true, // ✅ allow cookies (accessToken/refreshToken)
}));
}
app.use(morgan('dev'));
app.use(cookieParser());


// app.get('/', (req, res) => {
//     res.send('API is running...');
//   });

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

if (process.env.NODE_ENV === 'production') {  
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});  
}


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



