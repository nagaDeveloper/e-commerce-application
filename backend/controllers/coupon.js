import Coupon from '../models/Coupon.js';
import asyncHandler from 'express-async-handler';

export const createCoupon = asyncHandler(async (req, res) => {
  const { code, startDate, endDate, discount } = req.body;
  //check if admin
  //check if the coupon already exists
  const couponExists = await Coupon.findOne({ code });
  if (couponExists) {
    throw new Error('Coupon already exists');
  }
  //check if the discount is a number or not
  if (isNaN(discount)) {
    throw new Error('Discount value must be a proper number');
  }

  //create coupon
  const coupon = await Coupon.create({
    code: code?.toUpperCase(),
    startDate,
    endDate,
    discount,
    user: req.userAuthId.id,
  });
  res.json({ msg: 'Coupon created', coupon });
});

export const getAllCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find();
  res.json({
    msg: 'All coupons fetched successfully',
    coupons,
  });
});

export const getCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  res.json({
    status: 'Success',
    msg: 'Coupon fetched successfully',
    coupon,
  });
});

export const updateCoupon = asyncHandler(async (req, res) => {
  const { code, startDate, endDate, discount } = req.body;

  const coupon = await Coupon.findByIdAndUpdate(
    req.params.id,
    {
      code: code?.toUpperCase(),
      startDate,
      endDate,
      discount,
    },
    { new: true }
  );
  res.json({
    status: 'Success',
    msg: 'Coupon updated successfully',
    coupon,
  });
});

export const deleteCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findByIdAndDelete(req.params.id);
  res.json({
    status: 'Success',
    msg: 'Coupon deleted successfully',
    coupon,
  });
});
