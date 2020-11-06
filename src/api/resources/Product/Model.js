import mongoose from 'mongoose';

const { Schema, model } = mongoose;

export const Product = model('Product', new Schema({
  title: {
    type: String,
    required: [true, 'Product must have title'],
    unique: true
  },
  category:{
    type: Schema.Types.ObjectId,
    ref: 'ProductCategory'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}));



