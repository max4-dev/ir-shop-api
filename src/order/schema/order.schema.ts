import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  id: String,
  status: String,
  price: Number,
  count: Number,
  address: Object,
  products: Array,
  user: Object,
});
