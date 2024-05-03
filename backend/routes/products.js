import express from 'express';

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../controllers/products.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import upload from '../config/fileUpload.js';
import isAdmin from '../middlewares/isAdmin.js';

const productsRoute = express.Router();

productsRoute.post(
  '/',
  isLoggedIn,
  isAdmin,
  upload.array('files'),
  createProduct
);
productsRoute.get('/', getProducts);
productsRoute.get('/:id', getProduct);
productsRoute.put('/:id', isLoggedIn, isAdmin, updateProduct);
productsRoute.delete('/:id', isLoggedIn, isAdmin, deleteProduct);

export default productsRoute;
