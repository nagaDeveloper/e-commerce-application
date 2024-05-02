import Order from '../models/Order.js';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();
//stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);

export const createOrder = asyncHandler(async (req, res) => {
  //get the payload (customer, orderItems, address, price)
  const { orderItems, shippingAddress, totalPrice } = req.body;
  // find the user who is placing the order
  const user = await User.findById(req.userAuthId?.id);
  console.log(user, 'user');
  //check if the user has shipping address
  if (user?.hasShippingAddress) {
    throw new Error('Please provide a shipping address');
  }
  //check if the order is not empty
  if (orderItems.length <= 0) {
    throw new Error('No items for the Order');
  }
  //place the order save into DB
  const order = await Order.create({
    user: user?._id,
    orderItems,
    shippingAddress,
    totalPrice,
  });
  console.log(order, 'order');
  //push order into users
  user.orders.push(order?._id);
  await user.save();
  //update the quantity and sold details of the product
  const products = await Product.find({ _id: { $in: orderItems } });
  orderItems?.map(async (order) => {
    const product = products?.find((product) => {
      return product?._id === order?._id;
    });
    if (product) {
      product.totalSold += order.qty;
    }
    // await product.save();
  });
  //make stripe payment
  // convert orderItems to have the stripe order data
  const convertedOrders = orderItems.map((item) => {
    return {
      price_data: {
        currency: 'inr',
        product_data: {
          name: item?.name,
          description: item?.description,
        },
        unit_amount: item?.price * 100,
      },
      quantity: item?.qty,
    };
  });
  const session = await stripe.checkout.sessions.create({
    line_items: convertedOrders,
    metadata: {
      orderId: JSON.stringify(order?._id),
    },
    mode: 'payment',
    success_url: 'http://localhost;3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  });
  res.send({ url: session.url });
  //payment webhook

  //update the user order status
  // res.json({
  //   success: true,
  //   msg: 'Order created',
  //   order,
  //   user,
  // });
});
