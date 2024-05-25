import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  id: String,
  createdAt: Date,
  updatedAt: Date,
  name: String,
  slug: String,
  parent: String,
});
