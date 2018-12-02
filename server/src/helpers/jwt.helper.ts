import { decode, verify, sign ,} from 'jsonwebtoken';



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
function issueToken(params, options = { expiresIn: '15m' }) {
  return sign({ ...params }, 'secret', options);
}


/**
 * 
 * @param jwtToken 
 */
function verifyJWT(jwtToken: string) {
  verify(jwtToken, 'secret');
}



export const JWThelper = {
  decodeToken,
  verifyJWT,
  issueToken
}