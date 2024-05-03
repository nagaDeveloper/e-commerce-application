import express from 'express';
import {
  createBrand,
  getOneBrand,
  getBrands,
  updateBrand,
  deleteBrand,
} from '../controllers/brand.js';

import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';

const brandsRouter = express.Router();

brandsRouter.post('/', isLoggedIn, isAdmin, createBrand);

brandsRouter.get('/', getBrands);
brandsRouter.get('/:id', getOneBrand);
brandsRouter.put('/:id', isLoggedIn, isAdmin, updateBrand);
brandsRouter.delete('/:id', isLoggedIn, isAdmin, deleteBrand);

export default brandsRouter;
