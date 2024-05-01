import dotenv from 'dotenv';
import express from 'express';
import dbConnect from '../config/dbConnect.js';
import userRoutes from '../routes/users.js';
import bodyParser from 'body-parser';
import {
  globalErrorHandler,
  notFound,
} from '../middlewares/globalErrorHandler.js';
import productsRoute from '../routes/products.js';
import categoriesRouter from '../routes/category.js';
import brandsRouter from '../routes/brand.js';
import colorsRouter from '../routes/color.js';

dotenv.config();
dbConnect();
const app = express();
app.use(express.json());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/product', productsRoute);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/brands', brandsRouter);
app.use('/api/v1/colors', colorsRouter);

//error middleware
app.use(notFound);
app.use(globalErrorHandler);
export default app;
