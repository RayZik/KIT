import { UserApi, TokenApi } from '../../DB/api';
import { DBError } from "../../api/error/databaseError";




/**
 * Get login information function
 * @param email - user email
 * @param password - user password
 */
async function getLogin(email: string, password: string): Promise<any> {
    const user = await UserApi.GetUser({ email });
    if (!user || !user.validatePassword(password)) {
      throw new DBError({ message: "not valid", name: "not valid", type: "not valid" });
    }

    return user.toAuthJSON();
}


/**
 * Get login information function
 * @param email - user email
 * @param password - user password
 */
async function getRegistration(params) {
  const data = await UserApi.CreateUser(params) as any;

  return data.toAuthJSON()
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
    .then(values => values[0].toAuthJSON())
    .catch(error => error)
}



export const AuthService = {
  getLogin,
  getRegistration,
  issueNewTokenByRefresh
};