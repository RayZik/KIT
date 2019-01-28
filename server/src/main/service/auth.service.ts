import { UserApi, TokenApi } from '../../DB/api';



/**
 * Get login information function
 * @param email - user email
 * @param password - user password
 */
async function getLogin(email: string, password: string): Promise<any> {
  const user = await UserApi.GetUser({ email });

  return new Promise((resolve, reject) => {
    if (!user || !user.validatePassword(password)) {
      reject();
    } else {
      resolve(user);
    }
  });
}



/**
 * Issue new token by refresh
 * @param token - token 
 * @param refresh_token - refresh token
 */
async function issueNewTokenByRefresh(token: string, refresh_token: string) {
  const userId = await TokenApi.checkValidRefreshToken(token, refresh_token);

  return Promise.all([
    UserApi.GetUser({ _id: userId }),
    TokenApi.removeRefreshToken(userId)
  ])
    .then(values => values[0])
    .catch(error => error)
}



export const AuthService = {
  getLogin,
  issueNewTokenByRefresh
};