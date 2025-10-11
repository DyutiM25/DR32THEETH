import express from 'express';
import {signup, login, logout, refreshTokens, getUserProfile} from '../controllers/authController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/refresh-token', refreshTokens);
router.get('/profile', protectRoute, getUserProfile);

export default router;

