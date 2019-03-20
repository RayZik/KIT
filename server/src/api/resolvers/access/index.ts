import _ from 'lodash';
import { service } from '../../../api/service';

export default _.merge({
  AccessMutation: {
    auth_local: (obj, { email, password }, ctx, info) =>
      service(ctx, 'access', 'login', { email, password }),
    refresh_token: (obj, { refresh_token }, ctx, info) =>
      service(ctx, 'jwt', 'refreshToken', { refresh_token }),
    registartion: (obj, { params }, ctx, info) =>
      service(ctx, 'access', 'register', { ...params })
  }
});
