import express, {
  Router,
  Request,
  Response,
  NextFunction,
  static as expressStatic,
  Application
} from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import path from 'path';

import { PublicRouter } from './routes';
import { ApolloBuilderClass } from './apollo-builder.class';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';

/**
 * Application server class
 */
class App {
  /** instance of a app express */
  public app: Application = express();
  public router: Router = Router();
  public apiPath = '/api';

  constructor() {
    this.setConfig();
  }

  /**
   * Express setter
   */
  setConfig() {
    this.app.use(expressStatic(path.join(__dirname, 'public/client/dist')));
    this.app.use(cookieParser());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    // routes
    new ApolloBuilderClass(this.app);
    this.app.use(PublicRouter);
    this.app.use('/graph', voyagerMiddleware({ endpointUrl: this.apiPath }));
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.redirect(this.apiPath);
    });

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      next(new Error('Not Found'));
    });

    this.app.use((err: any, req: Request, res: Response) => {
      res.status(err.status || 500);
      res.json({
        error: {},
        message: err.message
      });
    });
  }
}

export default new App().app;
