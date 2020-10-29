import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const { Schema, model } = mongoose;
export const User = model('User', new Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
  },
  email: {
      type: String,
      required: [true, 'User must have an email'],
      unique: true,
  },
  password: {
      type: String,
      required: [true, 'User must have a password'],
      minlength: 6,
      select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  role: {
      type: String,
      enum: ['user', 'publishetr'],
      default: 'user',
  },
  createdAt: {
      type: Date,
      default: Date.now
  }
}));
