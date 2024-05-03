import express from 'express';
import {
  createCategory,
  getOneCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from '../controllers/category.js';

import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import categoryFileUpload from '../config/categoryUpload.js';

const categoriesRouter = express.Router();

categoriesRouter.post(
  '/',
  isLoggedIn,
  categoryFileUpload.single('file'),
  createCategory
);

categoriesRouter.get('/', getCategories);
categoriesRouter.get('/:id', getOneCategory);
categoriesRouter.put('/:id', isLoggedIn, updateCategory);
categoriesRouter.delete('/:id', isLoggedIn, deleteCategory);

export default categoriesRouter;
