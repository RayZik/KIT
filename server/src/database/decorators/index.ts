import { IAuthContext } from 'interface';
import { JWThelper } from '../../helpers/jwt.helper';
import _ from 'lodash';

/**
 * Decorator for checking an auth object and verifing a token
 */
export function AuthChecker() {
  return (target: Function, key: string, descriptor: PropertyDescriptor) => {
    return {
      // the second argument is always a context
      value: async function(...args: any[]) {
        const ctx: IAuthContext = args[1];
        const token = _.get(ctx, 'authInfo.token');
        const isVerified = token ? await JWThelper.verifyJWT(token) : undefined;

        if (isVerified) {
          const result = (descriptor.value as Function).apply(this, args);
          return result;
        } else {
          throw new Error('Refresh token isn\'t valid');
        }
      }
    };
  };
}
