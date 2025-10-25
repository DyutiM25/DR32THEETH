import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
// import appointmentRoutes from "./routes/appointmentRoutes.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
}
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/auth", authRoutes);
// app.use("/appointments", appointmentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
