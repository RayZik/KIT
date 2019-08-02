import {
  ApolloServer,
  makeExecutableSchema,
  SchemaDirectiveVisitor,
  ApolloServerExpressConfig,
  IMockFn,
  addMockFunctionsToSchema
} from 'apollo-server-express';
import { typeDefs, resolvers } from './api';
import { schemaDirectives } from './api/directives';
import { GraphQLFormattedError } from 'graphql';
import { IAuthContext } from './interface';

import { GQLMock } from '@world-kit/gql-mock';

import axios from 'axios';
import _ from 'lodash';

/**
 *
 */
export default class ApolloBuilder {
  private _app;
  private _path = '/api';

  constructor(app: Express.Application) {
    this._app = app;
    this.setApollo();
  }

  /**
   * Apollo server configuration
   */
  setApollo() {
    const schema = makeExecutableSchema({
      typeDefs: [typeDefs],
      resolvers,
      resolverValidationOptions: {
        requireResolversForResolveType: false
      }
    });
    const config: ApolloServerExpressConfig = {
      schema,
      context: ({ req }): IAuthContext => {
        const {
          headers: { token }
        } = req;

        return {
          token: String(token)
        };
      },
      formatResponse: this.formatResponseFn,
      formatError: this.formatErrorFn,
      tracing: true
    };

    getMocks().then((mockData) => {
      const defaultValues = new Map<string, IMockFn>([
        ['Number', () => 5555],
        ['JSON', () => ({ value: 'JSON' })],
        ['String', () => 'string']
      ]);

      const gqlMock = new GQLMock(schema, {
        preparedMocks: mockData,
        defaultTypesValue: defaultValues 
      });
      syncMocks(gqlMock.mocks); 

      addMockFunctionsToSchema({
        schema,  
        mocks: gqlMock.funcMocks,
        preserveResolvers: true
      });

      SchemaDirectiveVisitor.visitSchemaDirectives(schema, schemaDirectives);
    });

    new ApolloServer(config).applyMiddleware({
      app: this._app,
      path: this._path
    });
  }

  /**
   * Custom formatter for errors
   * @param error from resolver
   */
  formatErrorFn(error): GraphQLFormattedError {
    const extensions = error.extensions;
    const errors =
      extensions.exception && extensions.exception.errors
        ? extensions.exception.errors
        : {};

    // return {

    //   // code: extensions.code,
    //   message: error.message,
    //   stack: errors
    // };
    return error;
  }

  /**
   * Custom formatter for response
   * @param response response from resolver
   */
  formatResponseFn(response) {
    return response.data ? response : { errors: response.errors };
  }
}

export async function getMocks() {
  try {
    let result = await axios.get('http://localhost:9999/users/1');
    return result.data.data;
  } catch (error) {
    throw new Error(error);
  }
}

export function syncMocks(mocks) {
  let result = axios.put('http://localhost:9999/users/1', {
    data: mocks
  });
}
