import _ from 'lodash';
import UserResolver from './user';
import AccessResolver from './access';


export default _.merge(
  {
    JSON: () => ({}),
    Mutation: {
      user: () => ({}),
      access: () => ({})
    },
    Query: {
      user: () => ({}),
      // access: () => ({})
    },
  },
  UserResolver,
  AccessResolver
);