import { Schema } from 'mongoose';
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

export const RefreshToken = DB.model('RefreshToken', RefreshTokenSchema);
