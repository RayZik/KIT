import UserService from "./user";
import { AuthService } from "../auth/auth.service";



export default {
  Query: {
    auth: async (obj, args, context, info) => await AuthService.auth(args.email, args.password, context),
    user: async (obj, args, context, info) => await UserService.getCurrentUser(context)
  },
  Mutation: {
    user_create: async (obj, args, context, info) => await UserService.createUser(args.user_param)
  }
};