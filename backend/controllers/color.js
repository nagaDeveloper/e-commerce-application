import asyncHandler from 'express-async-handler';

import Color from '../models/Color.js';

export const createColor = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const colorFound = await Color.findOne({ name });
  if (colorFound) {
    throw new Error('Color already exists');
  }

  const color = await Color.create({
    name: name.toLowerCase(),
    user: req.userAuthId.id,
  });

  res.json({
    status: 'success',
    message: 'Color created successfully',
    color,
  });
});

export const getColors = asyncHandler(async (req, res) => {
  const colors = await Color.find();
  res.json({
    status: 'success',
    message: 'Colors fetched successfully',
    colors,
  });
});

export const getOneColor = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);
  res.json({
    status: 'success',
    message: 'Color fetched successfully',
    color,
  });
});

export const updateColor = asyncHandler(async (req, res) => {
  const { name } = req.body;

  //update
  const color = await Color.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    { new: true }
  );
  res.json({
    status: 'success',
    message: 'Color updated successfully',
    color,
  });
});

export const deleteColor = asyncHandler(async (req, res) => {
  const color = await Color.findByIdAndDelete(req.params.id);
  res.json({
    status: 'success',
    message: 'Color deleted successfully',
    color,
  });
});
