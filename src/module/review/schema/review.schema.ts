import * as mongoose from 'mongoose';

export const ReviewSchema = new mongoose.Schema({
  id: String,
  createdAt: String,
  updatedAt: String,
  rating: Number,
  text: String,
  user: {},
  userId: String,
  product: {},
  productId: String,
})