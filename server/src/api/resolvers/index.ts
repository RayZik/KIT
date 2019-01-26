import _ from 'lodash';
import UserResolver from './user';
import AccessResolver from './access';

import { login, refreshToken } from './access/auth.mutation';


export default _.merge(
  {
    JSON: () => ({}),
  },
  // {
  //   Mutation: {
  //     auth_local: (obj, { email, password }, ctx, info) => login(email, password),
  //     refresh_token: (obj, { refresh_token }, ctx, info) => refreshToken(ctx, refresh_token),
  //   }
  // },
  UserResolver,
  AccessResolver
);