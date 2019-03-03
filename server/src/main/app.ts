import express, { Router } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import path from 'path';

import { PublicRouter } from './route';
import { ApolloModule } from './module';



/**
 * Application server class
 */
class AppServer {
  /** instance of a app express */
  public app: express.Application = express();
  public router: express.Router = Router();

  constructor() {
    this.setConfig();
  }


  /**
   * Express setter
   */
  setConfig() {
    this.app.use(express.static(path.join(__dirname, 'public/client/dist')));
    this.app.use(cookieParser());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    // routes
    new ApolloModule.ApolloClass(this.app);
    this.app.use(PublicRouter);


    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
       res.redirect('/graphql')
    });

    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      next(new Error('Not Found'));
    });

    this.app.use((err: any, req: express.Request, res: express.Response) => {
      res.status(err.status || 500);
      res.json({
        error: {},
        message: err.message
      });
    });
  }
}


export default new AppServer().app;
