import _ from 'lodash';
// import { Mutation } from './mutation';
import UserResolver from './user';

import { login, refreshToken } from './auth/auth.query';


// export default _.merge(
 export default  {
    Query: {
      auth_local: (obj, { email, password }, context, info) => login(email, password),
      refresh_token: (obj, { refresh_token }, context, info) => refreshToken(context, refresh_token),
    }
  };
  // UserResolver
// );