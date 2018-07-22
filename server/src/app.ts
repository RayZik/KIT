import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
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
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cors());


    this.app.use('/gql/api', this.checkAuth, bodyParser.json(), graphqlExpress(req => {
      return {
        schema,
        context: {
          user: '121212'
        }
      };
    }));

    this.app.use('/gqli/api', graphiqlExpress({ endpointURL: '/gql/api' }));

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