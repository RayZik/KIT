import {
  ApolloServer,
  addMockFunctionsToSchema,
  makeExecutableSchema,
  AuthenticationError
} from "apollo-server-express";
import { typeDefs, resolvers } from '../../api';


export default class ApolloClass {
  private _app;

  constructor(app: Express.Application) {
    this._app = app;
    this.setApollo();
  }



  /**
   * Setter method form apollo server
   */
  setApollo() {

    const schema = makeExecutableSchema({ typeDefs, resolvers })

    const config = {
      schema,
      context: ({ req }) => {
        const { headers: { authorization: token } } = req;

        return {
          authInfo: {
            token
          }
        };
      },
      formatResponse: response => this.customFormatResponse(response),
      formatError: error => this.customFormatError(error),
    }

    new ApolloServer(config).applyMiddleware({ app: this._app });

    addMockFunctionsToSchema({ schema, mocks: {}, preserveResolvers: true });
  }


  /**
   * Custom formatter for errors
   * @param error from resolver
   */
  customFormatError(error) {
    const extensions = error.extensions;
    const errors = extensions.exception && extensions.exception.errors ? extensions.exception.errors : {};

    return {
      code: extensions.code,
      message: error.message,
      stack: errors
    };
  }


  /**
   * Custom formatter for response
   * @param response response from resolver 
   */
  customFormatResponse(response) {
    return response.data ? response : { errors: response.errors };
  }
}


export const ApolloModule = { ApolloClass };