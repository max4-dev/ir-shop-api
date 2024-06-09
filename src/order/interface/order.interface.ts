import { Document } from 'mongoose';
import { IPrivateUser } from 'src/module/user/interface/user.interface';

export interface IMinProduct {
  id: string;
  count: number;
}

export interface IOrder extends Document {
  id: string;
  status: string;
  address: unknown;
  price: number;
  count: number;
  products: IMinProduct[];
  user: IPrivateUser;
}
