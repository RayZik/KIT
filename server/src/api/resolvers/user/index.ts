import UserService from "./user";



export default {
  Query: {
    user: async (obj, args, context, info) => await UserService.getCurrentUser(context)
  },
  Mutation: {
    user_create: async (obj, args, context, info) => await UserService.createUser(args.user_param)
  }
};