import express from "express";
import { createClient } from "redis";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendOtpEmail } from "../utils/email.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Setup Redis client
const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.connect().catch(console.error);

// helpers
const OTP_TTL = 5 * 60; // 5 minutes
const COOKIE_NAME = process.env.COOKIE_NAME || "token";

// generate OTP
function genOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// create JWT
function createAccessToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m" }
  );
}

// 1) send OTP
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email required" });

    const otp = genOtp();
    const otpKey = `otp:${email}`;

    // store OTP in redis with TTL
    await redisClient.set(otpKey, otp, { EX: OTP_TTL });

    const requestId = uuidv4();
    await redisClient.set(`otpreq:${requestId}`, email, { EX: OTP_TTL });

    // send email
    await sendOtpEmail(email, otp);

    res.json({ message: "OTP sent", requestId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

// 2) verify OTP -> authenticate, set cookie
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res.status(400).json({ error: "email and otp required" });

    const otpKey = `otp:${email}`;
    const stored = await redisClient.get(otpKey);
    if (!stored)
      return res.status(400).json({ error: "OTP expired or not found" });
    if (stored !== otp) return res.status(400).json({ error: "Invalid OTP" });

    // OTP valid -> find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }

    // create access token only
    const accessToken = createAccessToken(user);

    // clear OTP (single use)
    await redisClient.del(otpKey);

    // set cookie (access token)
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 15, // 15 minutes
    };

    res.cookie(COOKIE_NAME, accessToken, cookieOptions);
    res.json({ message: "Logged in" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Verify failed" });
  }
};

// 3) logout
export const logout = async (req, res) => {
  try {
    res.clearCookie(process.env.COOKIE_NAME || "token");
    res.json({ message: "Logged out" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Logout failed" });
  }
};
