import { Document } from 'mongoose';
import { IOrder } from 'src/order/interface/order.interface';
// import { IReview } from 'src/module/review/interface/review.interface';

export interface User extends Document {
  id: string;
  name: string;
  phone: string;
  password: string;
  orders: IOrder[];
  // reviews: IReview[],
}
