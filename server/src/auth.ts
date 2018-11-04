
import * as jwt from 'express-jwt';

export const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;
  if (authorization) {
    return authorization;
  }

  return null;
};

export const auth = {
  required: jwt({
    secret: 'secret',
    userProperty: 'user',
    getToken: getTokenFromHeaders
  }),
  optional: jwt({
    secret: 'secret',
    userProperty: 'user',
    getToken: getTokenFromHeaders,
    credentialsRequired: false
  }),
};
