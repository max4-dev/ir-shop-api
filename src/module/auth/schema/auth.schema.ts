import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  phone: String,
  password: String,
  name: String,
  id: String,
  orders: Array,
});
