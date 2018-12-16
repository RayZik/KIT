import _ from "lodash";
import { JWThelper } from "../helpers/jwt.helper";



/**
 * Handler for get user id from context
 * @param ctx - context
 */
export function getUserIdFromCtx(ctx) {
  const token = _.get(ctx, 'authInfo.token', '');
  const { id } = JWThelper.decodeToken(token)
  return id;
}