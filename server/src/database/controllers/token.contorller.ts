import _ from 'lodash';

import { IAuthContext } from './../../interface';
import {
  REFRESH_TOKEN,
  REMOVE_REFRESH_TOKEN,
  VALIDATE_REFRESH_TOKEN,
  ISSUE_AND_SET_REFRESH_TOKEN
} from '../functions/token.fn';

export class JWTController {
  /**
   * Method for issue and set new refresh token
   * @param user_id - user id
   */
  static issueAndSetRefreshToken(req: { user_id: string }): Promise<string> {
    return ISSUE_AND_SET_REFRESH_TOKEN(req.user_id);
  }

  /**
   * Method for remove refresh token
   * @param user_id - user id
   */
  static removeRefreshToken(req: { user_id: string }) {
    return REMOVE_REFRESH_TOKEN(req.user_id);
  }

  /**
   * Method for validation refresh token
   * @param token - access token
   * @param refresh_token - refresh token
   */
  static validateRefreshToken(req: {
    token: string;
    refresh_token: string;
  }): Promise<string> {
    const { token, refresh_token } = req;
    return VALIDATE_REFRESH_TOKEN(token, refresh_token);
  }

  /**
   *
   * @param req
   * @param ctx
   */
  static async refreshToken(req: { refresh_token: string }, ctx: IAuthContext) {
    const { token } = ctx;

    return await REFRESH_TOKEN(token, req.refresh_token);
  }
}
