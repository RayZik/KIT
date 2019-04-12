import UserResolvers from './user'
import _ from 'lodash';

export default _.merge(
  {
    Mutation: {
      account: () => ({
        user: () => ({})
      })
    },
    Query: {
      account: () => ({
        user: () => ({})
      })
    }
  },
  UserResolvers
);
