import {Request, Response} from 'express';
import asyncHandler from 'express-async-handler';
import User from '../../models/user/user.model';
import generateToken from '../../utils/generate-token.utils';

// @desc Auth user/set token
// route POST /api/users/auth
// @access public
const authUser = asyncHandler(async (req: Request, res: Response) => {
  res.send('Auth user router');
});

// @desc Register a new user
// route Post /api/users
// @access public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const {name, email, password} = req.body;
  const userExists = await User.findOne({email});

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc logout a user
// route Post /api/users/logout
// @access public
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.send('Logout user controller');
});

// @desc Get user profile
// route Get /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  res.send('Get user profile');
});

// @desc Update user profile
// route PUT /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
  res.send('Update user profile');
});

export {authUser, registerUser, logoutUser, getUserProfile, updateUserProfile};
