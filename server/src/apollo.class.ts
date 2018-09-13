import { ApolloServer, addMockFunctionsToSchema } from "apollo-server-express";
import schema from './api'



export default class ApolloClass {
  private app;

  constructor(app: Express.Application) {
    this.app = app;

    this.setApollo();
  }


  /**
   * Setter method form apolo server
   */
  setApollo() {
    const config = {
      schema,
      formatResponse: response => this.customFormatResponse(response),
      formatError: error => this.customFormatError(error),
    }
    new ApolloServer(config).applyMiddleware({ app: this.app });

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