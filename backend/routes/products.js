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

const productsRoute = express.Router();

productsRoute.post('/', isLoggedIn, upload.array('files'), createProduct);
productsRoute.get('/', getProducts);
productsRoute.get('/:id', getProduct);
productsRoute.put('/:id', isLoggedIn, updateProduct);
productsRoute.delete('/:id', isLoggedIn, deleteProduct);

export default productsRoute;
