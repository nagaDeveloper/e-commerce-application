import express from 'express';

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../controllers/products.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const productsRoute = express.Router();

productsRoute.post('/', isLoggedIn, createProduct);
productsRoute.get('/', getProducts);
productsRoute.get('/:id', getProduct);
productsRoute.put('/:id', isLoggedIn, updateProduct);
productsRoute.delete('/:id', isLoggedIn, deleteProduct);

export default productsRoute;
