import mongoose from 'mongoose';
import Joi from 'joi';

const { Schema, model } = mongoose;
export const Vendor = model('Vendor', new Schema({
  name: {
    type: String,
    required: [true, 'Vendor must have name'],
  },
  contact: {
    type: String,
    required: [true, 'Vendor must have contact'],
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}));

