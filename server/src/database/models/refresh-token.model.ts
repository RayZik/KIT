import { Schema, Model } from 'mongoose';
import { DB } from '../db.class';

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

export const RefreshTokenModel: Model<any> = DB.model(
  'RefreshToken',
  RefreshTokenSchema
);
