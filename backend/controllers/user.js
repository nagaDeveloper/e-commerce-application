import User from '../models/User.js';
import brcypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import { generateToken } from '../utils/generateToken.js';
import { getToken } from '../utils/getToken.js';
import { verifyToken } from '../utils/verifyToken.js';
export const registerController = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  //checking if the user is already existed
  const userExists = await User.findOne({ email });
  if (userExists) {
    // throw a msg
    // return res.status(400).json({
    //   msg: 'User already exists. Please try a different Email',
    // });
    throw new Error('User already exists. Please try a different Email');
  }
  // if no user is registered
  // hash the password
  const salt = await brcypt.genSalt(12);
  const hashedPassword = await brcypt.hash(password, salt);
  //create a new user to the database
  const newUser = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });
  res.status(201).json({
    status: 'success',
    msg: 'User signed in successfully! You can now login.',
    data: newUser,
  });
});

export const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //we have to find the user in the db
  const userFound = await User.findOne({
    email,
  });
  console.log(userFound);
  //if no user found
  if (!userFound) {
    // return res.status(404).json({
    //   msg: 'Please login with a valid email id',
    // });
    throw new Error('Please login with a valid email id');
  }
  //pass that check and user found
  if (userFound) {
    const comparePassword = await brcypt.compare(password, userFound?.password);
    if (comparePassword) {
      return res.status(200).json({
        status: 'success',
        msg: 'User Logged in successfully!',
        user: userFound,
        token: generateToken(userFound?.id),
      });
    } else {
      // return res.status(200).json({
      //   msg: 'Please enter a valid password',
      // });
      throw new Error('Please enter a valid password');
    }
  }
});

//dummy profile creation

export const getUserProfile = asyncHandler(async (req, res) => {
  //find the user
  const user = await User.findById(req.userAuthId?.id).populate('orders');
  console.log(user, 'userIds');
  res.json({
    status: 'success',
    msg: 'welcome to your profile',
    user,
  });
});

//controller for update shipping address
export const updateShippingAddress = asyncHandler(async (req, res) => {
  const { firstName, lastName, address, city, postalCode, province, phone } =
    req.body;
  const user = await User.findByIdAndUpdate(
    req.userAuthId.id,
    {
      shippingAddress: {
        firstName,
        lastName,
        address,
        city,
        postalCode,
        province,
        phone,
      },
      hasShippingAddress: true,
    },
    {
      new: true,
    }
  );
  res.json({
    status: 'success',
    message: 'User shipping address updated successfully',
    user,
  });
});
