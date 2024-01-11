import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
   const token = req.cookies.access_token;
   console.log('Token:', token);

   if (!token) return next(errorHandler(401, 'You are not authenticated'));

   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
         console.error('Error verifying token:', err);
         if (err) return next(errorHandler(403, 'Forbidden/Token is not valid'));
      }
      console.log('Decoded user:', user);

      req.user = user;
      next();
   });
}; 