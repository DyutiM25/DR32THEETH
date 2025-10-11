import { redis } from "../lib/redis.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const accessToken = jwt.sign(
    { id: userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

const storeRefreshToken = async (refreshToken, userId) => {
  // 'EX' sets expiry in seconds → 7 days
  await redis.set(`refreshToken:${userId}`, refreshToken, "EX", 60 * 60 * 24 * 7);
};


const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 15 * 60 * 1000, //15 minutes
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 60 * 60 * 24 * 7 * 1000, //7 days
  });
};

export const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      age,
      gender,
      bloodGroup,
      phone,
      address,
      city,
      state,
      zip,
      email,
      password,
      role,
    } = req.body;

    if (!firstName || !lastName || !phone || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res
        .status(400)
        .json({
          message: "User already exists with this email or phone number",
        });
    }

    // Create new user (password auto-hashed, patientId auto-generated)
    const newUser = await User.create({
      firstName,
      lastName,
      age,
      gender,
      bloodGroup,
      phone,
      address,
      city,
      state,
      zip,
      email,
      password, // model hook hashes it
      role: role || "patient",
    });

    //Generate tokens
    const { accessToken, refreshToken } = generateToken(newUser._id);
    await storeRefreshToken(refreshToken, newUser._id);
    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
        patientId: newUser.patientId,
        _id: newUser._id,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in signing up" });
  }
};

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password)
      return res
        .status(400)
        .json({ message: "Please provide an email or patientId and password" });

    let user = null;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) {
      user = await User.findOne({ email: identifier });
    } else if (/^[0-9]{10}$/.test(identifier)) {
      user = await User.findOne({ patientId: identifier });
    }

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const { accessToken, refreshToken } = generateToken(user._id);
    await storeRefreshToken(refreshToken, user._id);
    setCookies(res, accessToken, refreshToken);

    res.status(200).json({
      message: "Login successful",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        patientId: user.patientId,
        _id: user._id,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in logging in" });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      await redis.del(`refreshToken:${decoded.id}`);
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in logging out" });
  }
};

export const refreshTokens = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const storedToken = await redis.get(`refreshToken:${decoded.id}`);

    if (storedToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 15 * 60 * 1000, //15 minutes
    });

    res
      .status(200)
      .json({ message: "Tokens refreshed successfully", accessToken });
  } catch (error) {
    console.error("Error in refreshing tokens", error);
    res
      .status(500)
      .json({
        message: "Invalid or expired refresh token",
        error: error.message,
      });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in getting user profile" });
  }
};
