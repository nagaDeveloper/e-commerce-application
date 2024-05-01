import Order from '../models/Order.js';
import asyncHandler from 'express-async-handler';

export const createOrder = asyncHandler(async (req, res) => {
  res.json({
    msg: 'order controller',
  });
});
