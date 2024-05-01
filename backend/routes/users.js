import express from 'express';
import {
  getUserProfile,
  loginController,
  registerController,
  updateShippingAddress,
} from '../controllers/user.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
const userRoutes = express.Router();

userRoutes.post('/register', registerController);

userRoutes.post('/login', loginController);

userRoutes.get('/profile', isLoggedIn, getUserProfile);

userRoutes.get('/update/shipping', isLoggedIn, updateShippingAddress);

export default userRoutes;
