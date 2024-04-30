import express from 'express';
import {
  getUserProfile,
  loginController,
  registerController,
} from '../controllers/user.js';
const userRoutes = express.Router();

userRoutes.post('/register', registerController);

userRoutes.post('/login', loginController);

userRoutes.get('/profile', getUserProfile);

export default userRoutes;
