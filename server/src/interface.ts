/**
 * Information about auth and loggined user
 */
export interface IAuthInfo {
  auth: IAuth;
  user: IUser;
}

/**
 * User interfase
 */
export interface IUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

/**
 *Auth interface
 */
export interface IAuth {
  token: string;
  refresh_token: string;
}

export interface IAuthContext {
  token: string;
  external_ip?: string;
}
