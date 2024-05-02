import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  getCoupon,
  updateCoupon,
} from '../controllers/coupon.js';
const couponRouter = express.Router();

couponRouter.post('/', isLoggedIn, createCoupon);
couponRouter.get('/', isLoggedIn, getAllCoupons);
couponRouter.get('/:id', isLoggedIn, getCoupon);
couponRouter.put('/update/:id', isLoggedIn, updateCoupon);
couponRouter.delete('/delete/:id', isLoggedIn, deleteCoupon);

export default couponRouter;
