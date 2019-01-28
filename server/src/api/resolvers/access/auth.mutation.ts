import { IAuthInfo } from "interface";
import { AuthService } from "../../../main/service";



/**
 * Login function
 * @param email - user email
 * @param password - user password
 */
export async function login(email: string, password: string): Promise<IAuthInfo> {
  const data = await AuthService.getLogin(email, password);
  console.log(await data.toAuthJSON());


  return (await AuthService.getLogin(email, password)).toAuthJSON();
}


/**
 * Refresh token function
 * @param token - current token
 * @param refresh_token - refresh token
 */
export async function refreshToken(ctx, refresh_token: string): Promise<IAuthInfo> {
  const { token } = ctx.authInfo;

  return (await AuthService.issueNewTokenByRefresh(token, refresh_token)).toAuthJSON();
}