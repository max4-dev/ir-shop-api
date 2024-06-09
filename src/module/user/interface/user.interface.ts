import { Document } from 'mongoose';

export interface IPrivateUser extends Document {
  id: string;
  name: string;
  phone: string;
}
