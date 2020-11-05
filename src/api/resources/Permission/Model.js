import mongoose from 'mongoose';

const { Schema, model } = mongoose;
export const Permission = model('Permission', new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  display_dashboard: {
    type: Boolean,
    default: true,
  },
  display_sales: {
    type: Boolean,
    default: false,
  },
  display_product: {
    type: Boolean,
    default: false,
  },
  display_product_category: {
    type: Boolean,
    default: false,
  },
  display_user_account: {
    type: Boolean,
    default: false,
  },
}));

