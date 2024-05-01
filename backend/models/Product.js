import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      ref: 'Category',
      required: true,
    },
    sizes: {
      type: [String],
      enum: ['S', 'M', 'L', 'XL', 'XXL'],
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    images: [
      {
        type: String,
        // required: true,
        default: 'https://via.placeholder.com/150',
      },
    ],

    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],

    price: {
      type: Number,
      required: true,
    },

    totalQty: {
      type: Number,
      required: true,
    },
    totalSold: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

//virtuals
//total rating

ProductSchema.virtual('totalReviews').get(function () {
  const product = this;
  return product?.reviews?.length;
});

//average rating calculation

ProductSchema.virtual('averageRating').get(function () {
  let ratingsSum = 0;
  const product = this;
  product?.reviews?.forEach((review) => {
    ratingsSum += review?.rating;
  });
  //average
  const averageRating = parseFloat(
    ratingsSum / product?.reviews?.length
  ).toFixed(1);
  return averageRating;
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
