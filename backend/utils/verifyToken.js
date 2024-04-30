import jwt from 'jsonwebtoken';

export const verifyToken = (token) => {
  console.log(process.env.SECRET, 'sec');
  return jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (!err) {
      return decoded;
    } else {
      return 'Token expired/invalid token';
    }
  });
};
