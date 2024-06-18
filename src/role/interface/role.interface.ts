import { Document } from 'mongoose';

export interface Role extends Document {
  role: string;
}
