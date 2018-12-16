import _ from 'lodash';
import UserResolver from './user';

import { login, refreshToken } from './auth/auth.mutation';


export default _.merge(
  {
    Mutation: {
      auth_local: (obj, { email, password }, ctx, info) => login(email, password),
      refresh_token: (obj, { refresh_token }, ctx, info) => refreshToken(ctx, refresh_token),
    }
  },
  UserResolver
);