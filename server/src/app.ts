import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as cors from 'cors';

import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
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
    this.app.use(urlencoded({ extended: true }));
    this.app.use(json());
    this.app.use(cors());


    this.app.use('/api', this.checkAuth, json(), graphqlExpress(req => {
      return {
        schema,
        context: {
          user: '121212'
        },
        formatError: error => ({
          type: error.message,
          stack: error.originalError && error.originalError.stack,
        }),
        formatResponse: res => {
          console.log('res', res);
          if (res.data) {
            return res;
          } else {
            return { errors: res.errors };
          }
        },
      };
    }));

    this.app.use('/gapi', graphiqlExpress({ endpointURL: '/api' }));

    this.app.use('*', (req: express.Request, res: express.Response, next) => {
      res.redirect('/gapi')
    });

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
}

export default new AppServer().app;