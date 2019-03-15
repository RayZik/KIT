import { decode, verify, sign } from 'jsonwebtoken';

/**
 * Decode token
 * @param token - current token
 */
function decodeToken(token: string): { id: string } {
  return decode(token, { json: true }) as any;
}

/**
 * @todo Доделать
 * @param id
 */
function issueToken(id, options = { expiresIn: '15m' }) {
  return sign({ id }, 'secret', options);
}

/**
 *
 * @param jwtToken
 */
function verifyJWT(jwtToken: string) {
  return new Promise((resolve, reject) => {
    verify(jwtToken, 'secret', {}, (err, decode) =>
      err ? reject(err) : resolve(decode)
    );
  });
}

export const JWThelper = {
  decodeToken,
  verifyJWT,
  issueToken
};
