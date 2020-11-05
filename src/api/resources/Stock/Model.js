import mongoose from 'mongoose';
import Joi from 'joi';

const { Schema, model } = mongoose;
export const Stock = model('Stock', new Schema({
  product:{
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product id required'],
  },
  quantity: {
    type: Number,
    required: [true, 'quantity required'],
  },
}));


