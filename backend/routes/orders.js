import express from 'express';

import {
  createOrder,
  fetchAllOrders,
  fetchSingleOrder,
  updateOrder,
} from '../controllers/orders.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const orderRouter = express.Router();

orderRouter.post('/', isLoggedIn, createOrder);
orderRouter.get('/', isLoggedIn, fetchAllOrders);
orderRouter.get('/:id', isLoggedIn, fetchSingleOrder);
orderRouter.get('/update/:id', isLoggedIn, updateOrder);

export default orderRouter;
