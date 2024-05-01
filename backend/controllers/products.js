import Category from '../models/Category.js';
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

  //find the category
  const categoryFound = await Category.findOne({ name: category });

  if (!categoryFound) {
    throw new Error('Category not found. Please create the category');
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
  categoryFound.products.push(product._id);
  //resave
  await categoryFound.save();
  res.json({
    status: 'success',
    msg: 'Product created successfully!',
    product,
  });
});

export const getProducts = asyncHandler(async (req, res) => {
  let productQuery = Product.find();
  //search by name
  if (req.query.name) {
    productQuery = productQuery.find({
      name: { $regex: req.query.name, $options: 'i' },
    });
  }

  //filter by brand
  if (req.query.brand) {
    productQuery = productQuery.find({
      brand: { $regex: req.query.brand, $options: 'i' },
    });
  }

  //filter by category
  if (req.query.category) {
    productQuery = productQuery.find({
      category: { $regex: req.query.category, $options: 'i' },
    });
  }

  //filter by colors
  if (req.query.colors) {
    productQuery = productQuery.find({
      colors: { $regex: req.query.colors, $options: 'i' },
    });
  }

  //filter by sizes
  if (req.query.sizes) {
    productQuery = productQuery.find({
      sizes: { $regex: req.query.sizes, $options: 'i' },
    });
  }

  //filter by price
  if (req.query.price) {
    const priceRange = req.query.price.split('-');
    //gte: greaterthanequalto
    //lte: lessthanequalto
    productQuery = productQuery.find({
      price: {
        $gte: parseFloat(priceRange[0]),
        $lte: parseFloat(priceRange[1]),
      },
    });
  }

  //pagination
  //page
  const page = parseInt(req.query.page) || 1;
  //limit
  const limit = parseInt(req.query.limit) || 3;
  //startindex
  const startIndex = (page - 1) * limit;
  //endIndex
  const endIndex = page * limit;
  //total
  const total = await Product.countDocuments();

  productQuery = productQuery.skip(startIndex).limit(limit);

  //pagibnation results
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  //await the query
  const products = await productQuery;
  res.json({
    status: 'success',
    results: products.length,
    total,
    pagination,
    message: 'products fetched successfully',
    products,
  });
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new Error('Product not found');
  }
  res.json({
    status: 'success',
    message: 'Product fetched successfully',
    product,
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
    brand,
  } = req.body;

  //update
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      category,
      sizes,
      colors,
      user,
      price,
      totalQty,
      brand,
    },
    { new: true }
  );
  res.json({
    status: 'success',
    message: 'Product updated successfully',
    product,
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.json({
    status: 'success',
    message: 'Product deleted successfully',
    product,
  });
});
