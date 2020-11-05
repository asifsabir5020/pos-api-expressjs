import mongoose from 'mongoose';

const { Schema, model } = mongoose;
export const Customer = model('Customer', new Schema({
  name: {
    type: String,
    required: [true, 'Customer must have name'],
  },
  contact: {
    type: String,
    required: [true, 'Customer must have contact'],
  },
}));

