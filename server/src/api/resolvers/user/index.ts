import UserQuery from "./user";



export default {
  Query: {
    user: (obj, args, context, info) => UserQuery.getUser(args.email).then(d => d)
  },
  Mutation: {
    user_create: (obj, args, context, info) => UserQuery.createUser(args.user_param).then(d => d)
  }
};