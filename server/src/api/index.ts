import Resolvers from './resolvers';
import { AuthenticationError } from 'apollo-server-core';
import { combineResolvers } from 'graphql-resolvers';
import _ from 'lodash';
import { JWThelper } from '../helpers/jwt.helper';
import { getDirFileContents } from '../utils/tools';

export const typeDefs = getDirFileContents(`${__dirname}/gql`, '.gql').join();

/**
 * The utility resolver to check access
 * Throw error if an unauthenticated user requests a resolver accessed only for authenticated users
 */
const isAuthenticated = async (root, args, { authInfo: { token } }, info) => {
  if (!token) {
    throw new AuthenticationError('Not authenticated');
  } else {
    try {
      await JWThelper.verifyJWT(token);
    } catch (error) {
      throw new AuthenticationError(error.message);
    }
  }
};

/**
 * The function to combine resolvers with isAuthenticated if _unauthorizedAccess property not includes them
 *
 * @param objValue - object with resolvers
 * @param srcValue - object with _unauthorizedAccess property
 */
function combineWithAuthResolver(
  objValue,
  srcValue: { _unauthorizedAccess: string[] },
) {
  Object.keys(objValue).forEach(resolverName => {
    if (!srcValue._unauthorizedAccess.includes(resolverName)) {
      objValue[resolverName] = combineResolvers(
        isAuthenticated,
        objValue[resolverName],
      );
    }
  });

  return objValue;
}

export const resolvers = _.mergeWith(
  Resolvers,
  {
    AccessMutation: { _unauthorizedAccess: ['auth_local','registartion'] },
  },
  combineWithAuthResolver,
);
