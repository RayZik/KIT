import * as express from 'express';
import * as cors from 'cors';

import { ApolloServer } from 'apollo-server-express';
import { schema } from './api'



/**
 * Application server
 */
class AppServer {
  /** instance of a app express */
  public app: express.Application;


  constructor() {
    this.app = express();
    this.setConfig();
  }


  /**
   * Config setter
   */
  setConfig() {

    this.app.use(cors());
    const apolloSer = new ApolloServer({
      schema,
      formatResponse: response => this.customFormatResponse(response),
      formatError: error => this.customFormatError(error),
    });
    apolloSer.applyMiddleware({ app: this.app, path: '/gapi' });
    this.app.use((req: express.Request, res: express.Response, next) => {
      next(new Error('Not Found'));
    });

    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.status(err.status || 500);
      res.json({
        error: {},
        message: err.message
      });
    });

  }


  checkAuth(req, res, next) {
    const isAutorithed = true;
    if (isAutorithed) {
      next();
    } else {
      next(new Error('Not Autorithed'));
    }
  }

  customFormatError(error) {
    // console.log(error);
    const extensions = error.extensions;
    const errors = extensions.exception && extensions.exception.errors ? extensions.exception.errors : {};

    return {
      code: extensions.code,
      stack: errors
    };
  }

  customFormatResponse(response) {
    return response.data ? response : { errors: response.errors };
  }
}

export default new AppServer().app;