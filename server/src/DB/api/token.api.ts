import _ from "lodash";
import uuid from 'uuid';

import { RefreshToken } from "../models";
import { JWThelper } from "../../helpers/jwt.helper";



/**
 * Method for issue and set new refresh token
 * @param user_id - user id 
 * @param refreshToken - custom refresh token (uuid by default)
 */
function issueAndSetRefreshToken(user_id: string, refreshToken: string = uuid()) {
  return new Promise((resolve, reject) => {
    RefreshToken.findOne({ user_id })
      .then(data => {
        if (data) {
          removeRefreshToken(user_id);
          reject();
        } else {
          // make new refresh token for user
          const issueRefreshToken = new RefreshToken({
            user_id,
            refreshToken
          });

          issueRefreshToken.save((error, data) => {
            if (error) {
              reject(error);
            } else {
              resolve(data.refreshToken);
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
  console.log(user_id, 5555);

  return new Promise((resolve, reject) => {
    RefreshToken.findOneAndRemove(user_id)
      .then(data => {
        resolve(data);
      })
      .catch(error => reject(error))
  });
}


/**
 * Method for validation refresh token
 * @param token - access token
 * @param refreshToken - refresh token
 */
function checkValidRefreshToken(token: string, refreshToken: string) {
  return new Promise((resolve, reject) => {
    const { id: user_id } = JWThelper.decodeToken(token);

    RefreshToken.findOne({ user_id })
      .then((token: string) => {

        if (!_.isNil(token) && token['refreshToken'] === refreshToken) {
          resolve(user_id);
        } else {
          reject();
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