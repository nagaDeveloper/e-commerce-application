import { getToken } from '../utils/getToken.js';
import { verifyToken } from '../utils/verifyToken.js';

export const isLoggedIn = (req, res, next) => {
  //get the token from header
  const token = getToken(req);
  //verify the token
  const decoded = verifyToken(token);
  //save the user into req obj
  console.log(decoded, 'verify');
  if (!decoded) {
    throw new Error('Token expired/ Invalid token');
  } else {
    req.userAuthId = decoded;
    next();
  }
};
