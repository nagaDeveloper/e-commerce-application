import User from '../models/User.js';

const isAdmin = async (req, res, next) => {
  //find the user
  const user = await User.findById(req.userAuthId?.id);
  //check if admin
  if (user?.isAdmin) {
    next();
  } else {
    next(new Error('Accesss denied! Only admin'));
  }
};

export default isAdmin;
