import { Schema } from 'mongoose';
import { dbService } from '../main';


export interface User {
  emial: string;
  avatar: string;
  password: string;
  roles: IUserRole[]
}

export interface IUserRole {
  role: number;
  description: string;
}


const UserSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String,
    default: ''
  },
  password: {
    type: String,
  },
  roles: [{
    role: {
      type: Number,
    },
    description: {
      type: String,
    },
  }]
});



export const User = dbService.model('User', UserSchema);
