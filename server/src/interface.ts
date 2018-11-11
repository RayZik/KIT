/**
 * Auth object token
 */
export interface IAuthInfo {
  auth: {
    token: string;
    refreshToken: string;
  };
  user: {
    id: string;
    email: string;
  }
}