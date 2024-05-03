import express from 'express';
import {
  createColor,
  getOneColor,
  getColors,
  updateColor,
  deleteColor,
} from '../controllers/color.js';

import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';

const colorsRouter = express.Router();

colorsRouter.post('/', isLoggedIn, isAdmin, createColor);

colorsRouter.get('/', getColors);
colorsRouter.get('/:id', getOneColor);
colorsRouter.put('/:id', isLoggedIn, isAdmin, updateColor);
colorsRouter.delete('/:id', isLoggedIn, isAdmin, deleteColor);

export default colorsRouter;
