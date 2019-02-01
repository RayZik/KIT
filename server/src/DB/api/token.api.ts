import _ from "lodash";
import uuid from 'uuid';

import { RefreshToken } from "../models";
import { JWThelper } from "../../helpers/jwt.helper";



/**
 * Method for issue and set new refresh token
 * @param user_id - user id 
 * @param refresh_token - custom refresh token (uuid by default)
 */
function issueAndSetRefreshToken(user_id: string, refresh_token: string = uuid()) {
  return new Promise((resolve, reject) => {
    RefreshToken.findOne({ user_id })
      .then(data => {
        const currentRefreshToken = _.get(data, 'refresh_token', undefined);

        if (!_.isNil(currentRefreshToken)) {
          resolve(currentRefreshToken);
        } else {
          // make a new refresh token for user
          const issueRefreshToken = new RefreshToken({
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
      })
  });
}


/**
 * Method for remove refresh token
 * @param user_id - user id
 */
function removeRefreshToken(user_id: string) {
  return new Promise((resolve, reject) => {
    RefreshToken.findOneAndDelete(user_id)
      .then(data => {
        resolve(data);
      })
      .catch(error => reject(error))
  });
}


/**
 * Method for validation refresh token
 * @param token - access token
 * @param refresh_token - refresh token
 */
function checkValidRefreshToken(token: string, refresh_token: string): Promise<string> {

  return new Promise((resolve, reject) => {
    const { id: user_id } = JWThelper.decodeToken(token);

    RefreshToken.findOne({ user_id })
      .then((tokenDoc: string) => {
        if (
          !_.isNil(tokenDoc) &&
          _.get(tokenDoc, 'refresh_token', undefined) === refresh_token
        ) {
          resolve(user_id);
        } else {
          reject(new Error('Refresh token not valid'));
        }
      })
      .catch(error => reject({ error }));
  });
}



export const TokenApi = {
  issueAndSetRefreshToken,
  checkValidRefreshToken,
  removeRefreshToken
};