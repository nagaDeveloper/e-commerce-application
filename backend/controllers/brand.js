import asyncHandler from 'express-async-handler';

import Brand from '../models/Brand.js';

export const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const brandFound = await Brand.findOne({ name });
  if (brandFound) {
    throw new Error('Brand already exists');
  }

  const brand = await Brand.create({
    name: name.toLowerCase(),
    user: req.userAuthId.id,
  });

  res.json({
    status: 'success',
    message: 'Brand created successfully',
    brand,
  });
});

export const getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find();
  res.json({
    status: 'success',
    message: 'Brands fetched successfully',
    brands,
  });
});

export const getOneBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  res.json({
    status: 'success',
    message: 'Brand fetched successfully',
    brand,
  });
});

export const updateBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  //update
  const brand = await Brand.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    { new: true }
  );
  res.json({
    status: 'success',
    message: 'Brand updated successfully',
    brand,
  });
});

export const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findByIdAndDelete(req.params.id);
  res.json({
    status: 'success',
    message: 'Brand deleted successfully',
    brand,
  });
});
