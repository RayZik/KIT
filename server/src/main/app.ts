import express, { Router } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';

import path from 'path';
import passport from "passport";

import { AuthRouter, PublicRouter } from './route';
import { PassportModule, ApolloModule } from './module';


// authentication middleware
// const authMiddleware = jwt({
//   // dynamically provide a signing key based on the kid in the header and 
//   // the signing keys provided by the JWKS endpoint.
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://YOUR_AUTH0_DOMAIN/.well-known/jwks.json`
//   }),

//   // validate the audience and the issuer.
//   audience: '{YOUR_API_IDENTIFIER}',
//   issuer: `https://YOUR_AUTH0_DOMAIN/`,
//   algorithms: ['RS256']
// })


/**
 * Application server class
 */
class AppServer {
  /** instance of a app express */
  public app: express.Application = express();
  public router: express.Router = Router();

  constructor() {
    PassportModule.setPassport();
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
    this.app.use(session({ secret: 'passport', resave: false, saveUninitialized: false }));
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    // routes
    this.app.use(AuthRouter);
    this.app.use(PublicRouter);

    new ApolloModule.ApolloClass(this.app);

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
