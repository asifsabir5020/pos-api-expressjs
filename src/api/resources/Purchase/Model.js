import mongoose from 'mongoose';

const { Schema, model } = mongoose;

export const Purchase = model('Purchase', new Schema({
  product:{
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product id required'],
  },
  vendor:{
    type: Schema.Types.ObjectId,
    ref: 'Vendor',
    required: [true, 'Vendor id required'],
  },
  quantity: {
    type: Number,
    required: [true, 'quantity required'],
  },
}));



