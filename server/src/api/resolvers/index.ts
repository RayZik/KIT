// import { Mutation } from './mutation';
// import UserResolver from './user';

import _ from 'lodash';
import { AuthModule } from '../../main/module';


export default _.merge(
  {
    Query: {
      auth_local: async (obj, { email, password }, context, info) => {
        let a = await AuthModule.login(email, password);
        console.log(a);
        
        return a;
      },
      refresh_token: async (obj, { refresh_token }, { authInfo: { token } }, info) => await AuthModule.refreshToken(token, refresh_token),
    }
  },
  // UserResolver
);