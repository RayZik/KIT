import * as express from 'express';
import * as path from 'path';

import ApolloClass from './apollo.class';



/**
 * Application server class
 */
class AppServer {
  /** instance of a app express */
  public app: express.Application;


  constructor() {
    this.app = express();
    this.setConfig();
  }


  /**
   * Express setter
   */
  setConfig() {
    this.app.use(this.authMiddleware);
    this.app.use(express.static(path.join(__dirname, 'public/client/dist')));
    new ApolloClass(this.app).setApollo();

    this.app.use('/test', (req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.send({ success: true })
    });
    this.app.get('/client', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(__dirname + '/public/client/dist/index.html'));
    });

    this.app.get('*', (req: express.Request, res: express.Response) => {
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


  /**
   * Middleware for check auth
   * @param req request
   * @param res response
   * @param next next
   */
  authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    const isAutorithed = true;

    if (isAutorithed) {
      next();
    } else {
      next(new Error('Not Autorithed'));
    }
  }
}

export default new AppServer().app;