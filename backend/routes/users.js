import express from 'express';
import { registerController } from '../controllers/user.js';
const userRoutes = express.Router();

userRoutes.get('/api/v1/users/register', registerController);

export default userRoutes;
