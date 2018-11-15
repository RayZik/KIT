import { IAuthInfo } from "interface";
import { AuthService } from "../service/auth.service";



/**
 * Login function
 * @param email - user email
 * @param password - user password
 */
async function login(email: string, password: string) {
  try {
    const user: any = await AuthService.getLogin(email, password);

    return user.toAuthJSON() as IAuthInfo;
  } catch (error) {
    return error;
  }
}


/**
 * Refresh token function
 * @param token - current token
 * @param refreshToken - refresh token
 */
async function refreshToken(token: string, refreshToken: string) {
  try {
    const user: any = await AuthService.issueNewTokenByRefresh(token, refreshToken);

    return user.toAuthJSON() as IAuthInfo;
  } catch (error) {
    return error;
  }
}




export const AuthModule = {
  login,
  refreshToken
};