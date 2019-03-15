import _ from 'lodash';
import { GET_USER } from './user.fn';
import { RefreshTokenModel } from '../models';
import { JWThelper } from '../../helpers/jwt.helper';
import uuid = require('uuid');

export async function REFRESH_TOKEN(token: string, refresh_token: string) {
  const user_id = await VALIDATE_REFRESH_TOKEN(token, refresh_token);
  try {
    let values = await Promise.all([
      GET_USER({ _id: user_id }),
      REMOVE_REFRESH_TOKEN(user_id)
    ]);

    return values[0].toAuthJSON();
  } catch (error) {
    throw new Error(error);
  }
}

export async function REMOVE_REFRESH_TOKEN(user_id: string) {
  try {
    return await RefreshTokenModel.findOneAndDelete({ user_id });
  } catch (error) {
    throw new Error(error);
  }
}

export async function VALIDATE_REFRESH_TOKEN(
  token: string,
  refresh_token: string
) {
  try {
    const { id: user_id } = JWThelper.decodeToken(token);
    const tokenDoc = await RefreshTokenModel.findOne({ user_id });
    if (
      !_.isNil(tokenDoc) &&
      _.get(tokenDoc, 'refresh_token', undefined) === refresh_token
    ) {
      return user_id;
    } else {
      /**@todo */
      throw new Error('Refresh token not valid');
    }
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * @todo divide into 2 functions
 * @param token
 * @param refresh_token
 */
export async function ISSUE_AND_SET_REFRESH_TOKEN(user_id: string) {
  try {
    const data = await RefreshTokenModel.findOne({ user_id });
    let currentRefreshToken = _.get(data, 'refresh_token', undefined);
    if (!_.isNil(currentRefreshToken)) {
      return currentRefreshToken;
    } else {
      // make a new refresh token for user
      const issueRefreshToken = new RefreshTokenModel({
        user_id,
        refresh_token: uuid()
      });

      currentRefreshToken = (await issueRefreshToken.save()).refresh_token;
    }

    return currentRefreshToken;
  } catch (error) {
    throw new Error(error);
  }
}
