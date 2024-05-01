import Product from '../models/Product.js';
import asyncHandler from 'express-async-handler';

export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, category, sizes, colors, price, totalQty, brand } =
    req.body;
  console.log(req, 'req');
  //check if the product already exists
  console.log(name, 'pro');
  const existsProduct = await Product.findOne({ name });
  if (existsProduct) {
    console.log(existsProduct, 'exists product');
    throw new Error('Product already exists');
  }
  const product = await Product.create({
    name,
    description,
    category,
    sizes,
    colors,
    user: req.userAuthId.id,
    price,
    totalQty,
    brand,
  });
  // push the product into category
  res.json({
    status: 'success',
    msg: 'Product created successfully!',
    product,
  });
});

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json({
    status: 'success',
    products,
  });
});
