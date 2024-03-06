import { Document } from 'mongoose';
// import { IReview } from './review.interface';
// import { IOrder } from './order.interface';

export interface User extends Document {
  id: string;
  name: string;
  phone: string;
  password: string;
  // orders: IOrder[],
  // reviews: IReview[],
}