import { decode } from 'jsonwebtoken';



/**
 * Decode token
 * @param token - current token
 */
function decodeToken(token: string): any {
  return decode(token, { json: true });
}



/**
 * @todo Доделать
 * @param id 
 */
function issueToken(id) {

}



export const JWThelper = {
  decodeToken
}