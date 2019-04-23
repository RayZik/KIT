import { JWThelper } from '../../helpers/jwt.helper';
import _ from 'lodash';
import { SError } from '../error';
import { IAuthContext } from './../../interface';

/**
 * Decorator for checking an auth object and verifing a token
 */
export function AuthChecker() {
  return (target: Function, key: string, descriptor: PropertyDescriptor) => {
    return {
      // the second argument is always a context
      value: async function(...args: any[]) {
        const ctx: IAuthContext = args[1];
        const func: Function = descriptor.value;
        const token = ctx.token;
        console.log('[AuthChecker.name]', key);
        console.log('[AuthChecker.ctx]', ctx);

        if (token !== undefined) {
          const isVerified = token
            ? await JWThelper.verifyJWT(token)
            : undefined;

          if (isVerified !== undefined) {
            return func.apply(this, args);
          }
        }

        throw new SError('Access is denied');
      }
    };
  };
}
