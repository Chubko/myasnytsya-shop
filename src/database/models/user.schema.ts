import { Document, Model, model, Schema} from 'mongoose';

import {IUser} from '../../models';

export type UserType = IUser & Document;

export const UserSchema: Schema = new Schema<any>({ //todo
  name: {
    type: String,
    required: true,
    trim: true
  },
  surname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  },
  age: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  gender: {
    type: String,
    required: false
  },
  photo: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: true,
    default: 'pending'
  },
  createdAt: {
    type: Date,
    required: Date.now
  }
});

export const UserModel: Model<UserType> = model<UserType>('users', UserSchema);
