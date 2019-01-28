import { Schema } from 'mongoose';
import { dbService } from '../../DB/main';



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


export const RefreshToken = dbService.model('RefreshToken', RefreshTokenSchema);