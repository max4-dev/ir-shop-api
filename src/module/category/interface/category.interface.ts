import { Document } from 'mongoose';

export interface ICategory extends Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  slug: string;
  parent?: string;
}
