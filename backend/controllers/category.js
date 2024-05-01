import asyncHandler from 'express-async-handler';

import Category from '../models/Category.js';

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const categoryFound = await Category.findOne({ name });
  if (categoryFound) {
    throw new Error('Categoryy already exists');
  }

  const category = await Category.create({
    name: name.toLowerCase(),
    user: req.userAuthId.id,
  });

  res.json({
    status: 'success',
    message: 'Category created successfully',
    category,
  });
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.json({
    status: 'success',
    message: 'Categories fetched successfully',
    categories,
  });
});

export const getOneCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.json({
    status: 'success',
    message: 'Category fetched successfully',
    category,
  });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  //update
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    { new: true }
  );
  res.json({
    status: 'success',
    message: 'Category updated successfully',
    category,
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  res.json({
    status: 'success',
    message: 'Product deleted successfully',
    category,
  });
});
