import User from '../models/User.js';

export const registerController = async (req, res) => {
  console.log('hellio', req);
  res.json({
    msg: 'Hello Naga',
  });
};
