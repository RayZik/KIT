import _ from 'lodash';
import AccountResolver from './account';
import AccessResolver from './access';

export default _.merge(
  {
    JSON: () => ({}),
    Mutation: {
      account: () => ({}),
      access: () => ({})
    },
    Query: {
      account: () => ({})
    }
  },
  AccountResolver,
  AccessResolver
);
