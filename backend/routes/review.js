import express from 'express';
import { createReview } from '../controllers/review.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
const reviewRouter = express.Router();

reviewRouter.post('/:id', isLoggedIn, createReview);

export default reviewRouter;
