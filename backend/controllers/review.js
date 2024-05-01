import Product from '../models/Product.js';
import Review from '../models/Review.js';
import asyncHandler from 'express-async-handler';
export const createReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { product, message, rating } = req.body;
  console.log(id);
  const productFound = await Product.findById(id).populate('reviews');
  if (!productFound) {
    throw new Error('Product not found');
  }
  //check if already reviewed
  const hasReviewed = productFound?.reviews?.find((review) => {
    return review?.user.toString() === req?.userAuthId?.id.toString();
  });
  if (hasReviewed) {
    throw new Error('You have already reviewed the product');
  }
  console.log(hasReviewed, 'has');
  //create a review
  const review = await Review.create({
    message,
    rating,
    product: productFound?._id,
    user: req.userAuthId.id,
  });

  //push review into product found
  productFound.reviews.push(review?._id);
  await productFound.save();
  res.status(201).json({
    success: true,
    message: 'Review crated successfully',
  });
});
