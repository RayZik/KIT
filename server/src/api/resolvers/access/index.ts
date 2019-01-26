import _ from "lodash";
import { login, refreshToken } from "./auth.mutation";



export default _.merge(
  {
    AuthMutation: {
      local: (obj, { email, password }, ctx, info) => login(email, password),
      refresh_token: (obj, { refresh_token }, ctx, info) => refreshToken(ctx, refresh_token),
    }
  }
);