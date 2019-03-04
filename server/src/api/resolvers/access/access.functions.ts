import { UserFn, TokenFn } from '../../../database';
import { DBError } from '../../error';

/**
 * Get login information function
 * @param email - user email
 * @param password - user password
 */
export async function getLogin(email: string, password: string): Promise<any> {
  const user = await UserFn.GetUser({ email });
  if (!user || !user.validatePassword(password)) {
    throw new DBError({
      message: 'not valid',
      name: 'not valid',
      type: 'not valid'
    });
  }

  return user.toAuthJSON();
}

/**
 * Get login information function
 * @param email - user email
 * @param password - user password
 */
export async function getRegistration(params) {
  const data = (await UserFn.CreateUser(params)) as any;

  return data.toAuthJSON();
}

/**
 * Issue new token by refresh
 * @param token - token
 * @param refresh_token - refresh token
 */
export async function issueNewTokenByRefresh(
  token: string,
  refresh_token: string
) {
  const userId = await TokenFn.checkValidRefreshToken(token, refresh_token);

  return Promise.all([
    UserFn.GetUser({ _id: userId }),
    TokenFn.removeRefreshToken(userId)
  ])
    .then((values) => values[0].toAuthJSON())
    .catch((error) => error);
}
