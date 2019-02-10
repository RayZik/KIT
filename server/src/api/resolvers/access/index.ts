import _ from "lodash";
import { login, refreshToken } from "./auth";
import { registration } from "./registration";



export default _.merge(
  {
    AccessMutation: {
      auth_local: (obj, { email, password }, ctx, info) => login(email, password),
      refresh_token: (obj, { refresh_token }, ctx, info) => refreshToken(ctx, refresh_token),
      registartion: (obj, { params }, ctx, info) => registration(ctx, params),
    }
  },
);