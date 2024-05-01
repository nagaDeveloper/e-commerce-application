import express from 'express';
import {
  createColor,
  getOneColor,
  getColors,
  updateColor,
  deleteColor,
} from '../controllers/color.js';

import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const colorsRouter = express.Router();

colorsRouter.post('/', isLoggedIn, createColor);

colorsRouter.get('/', getColors);
colorsRouter.get('/:id', getOneColor);
colorsRouter.put('/:id', isLoggedIn, updateColor);
colorsRouter.delete('/:id', isLoggedIn, deleteColor);

export default colorsRouter;
