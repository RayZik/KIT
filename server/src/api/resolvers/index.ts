import _ from 'lodash';
import AccountResolver from './account';
import DocumentResolver from './document';
import AccessResolver from './access';
import ListResolver from './list';

export default _.merge(
  {
    JSON: () => ({}),
    Mutation: {
      account: () => ({}),
      access: () => ({}),
      document: () => ({})
    },
    Query: {
      account: () => ({}),
      document: () => ({})
    }
  },
  DocumentResolver,
  AccountResolver,
  AccessResolver,
  ListResolver
);
