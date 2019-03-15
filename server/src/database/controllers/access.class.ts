import _ from 'lodash';

import { DBError } from '../../api/error';
import { GET_USER } from '../functions';

export class Access {
  static async login(req: { email: string; password: string }) {
    const { email, password } = req;
    const user = await GET_USER({ email });
    if (!user || !user.validatePassword(password)) {
      throw new DBError({
        message: 'not valid',
        name: 'not valid',
        type: 'not valid'
      });
    }

    return user.toAuthJSON();
  }

  static async register(req: { email: string; password: string }) {
    const { email, password } = req;
    const user = await GET_USER({ email });
    if (!user || !user.validatePassword(password)) {
      throw new DBError({
        message: 'not valid',
        name: 'not valid',
        type: 'not valid'
      });
    }

    return user.toAuthJSON();
  }

}
