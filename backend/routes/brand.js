import express from 'express';
import {
  createBrand,
  getOneBrand,
  getBrands,
  updateBrand,
  deleteBrand,
} from '../controllers/brand.js';

import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const brandsRouter = express.Router();

brandsRouter.post('/', isLoggedIn, createBrand);

brandsRouter.get('/', getBrands);
brandsRouter.get('/:id', getOneBrand);
brandsRouter.put('/:id', isLoggedIn, updateBrand);
brandsRouter.delete('/:id', isLoggedIn, deleteBrand);

export default brandsRouter;
