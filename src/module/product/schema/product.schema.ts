import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  id: String,
  title: String,
  salePercent: Number,
  slug: String,
  description: String,
  images: [String],
  categories: [String],
  price: Number,
  inStock: Boolean,
})