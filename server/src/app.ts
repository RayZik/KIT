import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { schema } from 'api'



/**
 * Application server
 */
class AppServer {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }


  /**
   * Config setter
   */
  config(): void {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cors());


    this.app.use('/graphql', this.checkAuth, bodyParser.json(), graphqlExpress(req => {
      return {
        schema,
        context: {
          user: '121212'
        }
      };
    }));
    this.app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

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
      res.status(500);
      res.json({
        error: { type: 'auth' },
        message: 'Not Autorithed'
      });
    }
  }
}

export default new AppServer().app;