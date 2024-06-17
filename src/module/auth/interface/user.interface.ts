import { Document } from 'mongoose';
import { IOrder } from 'src/order/interface/order.interface';

export interface User extends Document {
  id: string;
  name: string;
  phone: string;
  password: string;
  orders: IOrder[];
}
