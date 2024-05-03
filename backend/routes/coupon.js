import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  getCoupon,
  updateCoupon,
} from '../controllers/coupon.js';
import isAdmin from '../middlewares/isAdmin.js';
const couponRouter = express.Router();

couponRouter.post('/', isLoggedIn, createCoupon);
couponRouter.get('/', isLoggedIn, getAllCoupons);
couponRouter.get('/:id', isLoggedIn, getCoupon);
couponRouter.put('/update/:id', isLoggedIn, isAdmin, updateCoupon);
couponRouter.delete('/delete/:id', isLoggedIn, isAdmin, deleteCoupon);

export default couponRouter;
