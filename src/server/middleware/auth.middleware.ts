import jwt, {JwtPayload} from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user/user.model.js';
import {NextFunction, Request, Response} from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'someSecret';

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.user = await User.findById(decoded.userId).select('-password');
        next();
      } catch (error) {
        res.status(401);
        throw new Error('Not authorized, invalid token');
      }
    } else {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  }
);

export {protect};
