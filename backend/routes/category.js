import express from 'express';
import {
  createCategory,
  getOneCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from '../controllers/category.js';

import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const categoriesRouter = express.Router();

categoriesRouter.post('/', isLoggedIn, createCategory);

categoriesRouter.get('/', getCategories);
categoriesRouter.get('/:id', getOneCategory);
categoriesRouter.put('/:id', isLoggedIn, updateCategory);
categoriesRouter.delete('/:id', isLoggedIn, deleteCategory);

export default categoriesRouter;
