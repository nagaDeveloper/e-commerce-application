import dotenv from 'dotenv';
import express from 'express';
import dbConnect from '../config/dbConnect.js';
import userRoutes from '../routes/users.js';

dotenv.config();
dbConnect();
const app = express();
app.use(userRoutes);

export default app;
