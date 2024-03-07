import { Document } from 'mongoose';

export interface IProduct extends Document {
  id: string;
  title: string;
  salePercent: number;
  slug: string;
  description?: string;
  images: string[];
  categories: string[];
  price: number;
  inStock: boolean;
}
