import dotenv from 'dotenv';
import express from 'express';
import dbConnect from '../config/dbConnect.js';
import userRoutes from '../routes/users.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import {
  globalErrorHandler,
  notFound,
} from '../middlewares/globalErrorHandler.js';
import productsRoute from '../routes/products.js';
import categoriesRouter from '../routes/category.js';
import brandsRouter from '../routes/brand.js';
import colorsRouter from '../routes/color.js';
import reviewRouter from '../routes/review.js';
import orderRouter from '../routes/orders.js';
import Stripe from 'stripe';
import Order from '../models/Order.js';
import couponRouter from '../routes/coupon.js';

dotenv.config();
dbConnect();
const app = express();
app.use(cors());

//stripe webhook

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.
const stripe = new Stripe(process.env.STRIPE_KEY);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  'whsec_6fc7d2fbd8e024237e1d24b46675ecc1bae2bc89f1ed0e42052b2c3370f2ecc2';

app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      console.log(event, 'eve');
    } catch (err) {
      console.log(err.message);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === 'checkout.session.completed') {
      //update the order
      const session = event.data.object;
      const { orderId } = session.metadata;
      const paymentStatus = session.payment_status;
      const paymentMethod = session.payment_method_types[0];
      const totalAmount = session.amount_total;
      const currency = session.currency;

      //find the order
      const order = await Order.findByIdAndUpdate(
        JSON.parse(orderId),
        {
          totalPrice: totalAmount / 100,
          currency,
          paymentMethod,
          paymentStatus,
        },
        { new: true }
      );
    } else {
      return;
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

app.use(express.json());
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'OPTIONS, GET, POST, PUT, PATCH, DELETE'
//   );
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/product', productsRoute);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/brands', brandsRouter);
app.use('/api/v1/colors', colorsRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/coupons', couponRouter);

//error middleware
app.use(notFound);
app.use(globalErrorHandler);
export default app;
