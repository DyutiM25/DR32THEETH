import { createClient } from "redis";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendOtpEmail } from "../utils/email.js";
import dotenv from "dotenv";

dotenv.config();

// Setup Redis client
const redisClient = createClient({ url: "redis://localhost:6379" });
redisClient.on("error", (err) => console.error("Redis Client Error:", err));

await redisClient.connect();

console.log("Connected to Redis");

// helpers
const OTP_TTL = 5 * 60; // 5 minutes

// generate OTP
function genOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// create JWT
function createAccessToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "1d" }
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
    const {
      email,
      otp,
      firstName,
      lastName,
      dob,
      gender,
      bloodGroup,
      phone,
      address,
      city,
      state,
      zip,
      role,
      patientId,
    } = req.body;

    if (!email || !otp)
      return res.status(400).json({ error: "Email and OTP are required" });

    const otpKey = `otp:${email}`;
    const stored = await redisClient.get(otpKey);
    if (!stored)
      return res.status(400).json({ error: "OTP expired or not found" });
    if (stored !== otp) return res.status(400).json({ error: "Invalid OTP" });

    // OTP valid -> find user
    let user = await User.findOne({ where: { email } });

    // If user doesn't exist -> signup
    if (!user) {
      // Validate required signup fields
      const missingFields = [];
      if (!firstName) missingFields.push("firstName");
      if (!lastName) missingFields.push("lastName");
      if (!dob) missingFields.push("dob");
      if (!gender) missingFields.push("gender");
      if (!bloodGroup) missingFields.push("bloodGroup");
      if (!phone) missingFields.push("phone");
      if (!address) missingFields.push("address");
      if (!city) missingFields.push("city");
      if (!state) missingFields.push("state");
      if (!zip) missingFields.push("zip");

      if (missingFields.length > 0)
        return res.status(400).json({
          error: `Missing required fields for signup: ${missingFields.join(
            ", "
          )}`,
        });

      // Create new user
      user = await User.create({
        firstName,
        lastName,
        dob,
        gender,
        bloodGroup,
        phone,
        address,
        city,
        state,
        zip,
        email,
        role: role || "patient",
        patientId,
      });
    }

    // Generate JWT
    const accessToken = createAccessToken({ id: user.id, email: user.email });

    // Clear OTP (single use)
    await redisClient.del(otpKey);

    // Set cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    };
    res.cookie("token", accessToken, cookieOptions);

    res.json({ message: "Logged in successfully", user });
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
