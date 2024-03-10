import { Document } from 'mongoose';
import { User } from 'src/module/auth/interface/user.interface';
import { IProduct } from 'src/module/product/interface/product.interface';

export interface IReview extends Document {
  id: string;
  createdAt: string;
  updatedAt: string;

  rating: number;
  text: string;
  user: User;
  userId: string;
  product: IProduct;
  productId: string;
}