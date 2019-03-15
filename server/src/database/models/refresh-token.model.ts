import { Schema, Model, Document } from 'mongoose';
import { DB } from '../db.class';

export interface IRefreshTokenModel extends Document {
  user_id: string;
  refresh_token: string;
}

/**
 * Refresh token model
 */
const RefreshTokenSchema = new Schema({
  user_id: {
    type: String,
    unique: true
  },
  refresh_token: {
    type: String
  }
});

export const RefreshTokenModel: Model<IRefreshTokenModel> = DB.model(
  'RefreshToken',
  RefreshTokenSchema
);
