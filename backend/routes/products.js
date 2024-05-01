import express from 'express';

import { createProduct, getProducts } from '../controllers/products.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const productsRoute = express.Router();

productsRoute.post('/', isLoggedIn, createProduct);
productsRoute.get('/', getProducts);

export default productsRoute;
