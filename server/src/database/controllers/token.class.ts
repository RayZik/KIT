import _ from 'lodash';
import uuid from 'uuid';

import { RefreshTokenModel } from '../models';
import { JWThelper } from '../../helpers/jwt.helper';

export class JWT {
  /**
   * Method for issue and set new refresh token
   * @param user_id - user id
   * @param refresh_token - custom refresh token (uuid by default)
   */
  static issueAndSetRefreshToken({
    user_id,
    refresh_token = uuid()
  }: {
    user_id: string;
    refresh_token?: string;
  }) {
    return new Promise((resolve, reject) => {
      RefreshTokenModel.findOne({ user_id }).then((data) => {
        const currentRefreshToken = _.get(data, 'refresh_token', undefined);

        if (!_.isNil(currentRefreshToken)) {
          resolve(currentRefreshToken);
        } else {
          // make a new refresh token for user
          const issueRefreshToken = new RefreshTokenModel({
            user_id,
            refresh_token
          });

          issueRefreshToken.save((error, data) => {
            if (error) {
              reject(error);
            } else {
              resolve(data.refresh_token);
            }
          });
        }
      });
    });
  }

  /**
   * Method for remove refresh token
   * @param user_id - user id
   */
  static removeRefreshToken({ user_id }: { user_id: string }) {
    return new Promise((resolve, reject) => {
      RefreshTokenModel.findOneAndDelete({ user_id })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Method for validation refresh token
   * @param token - access token
   * @param refresh_token - refresh token
   */
  static checkValidRefreshToken({
    token,
    refresh_token
  }: {
    token: string;
    refresh_token: string;
  }): Promise<string> {
    return new Promise((resolve, reject) => {
      const { id: user_id } = JWThelper.decodeToken(token);

      RefreshTokenModel.findOne({ user_id })
        .then((tokenDoc) => {
          if (
            !_.isNil(tokenDoc) &&
            _.get(tokenDoc, 'refresh_token', undefined) === refresh_token
          ) {
            resolve(user_id);
          } else {
            /**@todo */
            reject(new Error('Refresh token not valid'));
          }
        })
        .catch((error) => reject({ error }));
    });
  }
}
