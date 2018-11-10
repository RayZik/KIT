import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';

import * as path from 'path';
import * as passport from "passport";
import ApolloClass from './apollo.class';
// import { auth } from './auth';
// import { User } from '../database/models/User';
import { AuthRouter, PublicRouter } from './route';
import { setPassport } from './module/passport.module';
import { Router } from 'express';


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
    setPassport();
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
    // this.app.use('/graphql', auth.optional);

    // routes
    this.app.use(AuthRouter);
    this.app.use(PublicRouter);

    new ApolloClass(this.app);

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
