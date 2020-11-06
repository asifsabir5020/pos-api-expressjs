import mongoose from 'mongoose';

const { Schema, model } = mongoose;

export const SaleItem = new Schema({
  product:{
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product id required'],
  },
  quantity: {
    type: Number,
    required: [true, 'quantity required'],
  },
  created_at: {
    type: Date,
    default: Date.now
  },
});

export const Sale = model('Sale', new Schema({
  customer:{
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: [true, 'customer id required'],
  },
  sale_items: [SaleItem],
  created_at: {
    type: Date,
    default: Date.now
  },
}));



