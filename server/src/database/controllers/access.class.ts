import _ from 'lodash';

import { GET_USER, CREATE_USER } from '../functions';
import { SError } from '../error';

export class Access {
  static async login(req: { email: string; password: string }) {
    const { email, password } = req;
    const user = await GET_USER({ email });
    if (!user || !user.validatePassword(password)) {
      throw new SError('GET_USER: Not valid');
    }

    return user.toAuthJSON();
  }

  static async register(req: { email: string; password: string }) {
    return (await CREATE_USER(req)).toAuthJSON();
  }
}
