import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';

import * as path from 'path';
import * as passport from "passport";
import { Strategy } from "passport-local";
import ApolloClass from './apollo.class';
import { auth } from './auth';
import { User } from './database/models/User';


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
  public app: express.Application;


  constructor() {
    this.app = express();
    this.setPassport();
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
    this.app.use('/graphql', auth.optional);



    this.app.post('/login', (req, res, next) => {

      const { body: { email, password } } = req;

      if (!email) {
        return res.status(422).json({
          errors: {
            email: 'is required',
          },
        });
      }

      if (!password) {
        return res.status(422).json({
          errors: {
            password: 'is required',
          },
        });
      }

      return passport.authenticate('local', { session: false }, (err, passportUser, info) => {

        if (err) {
          return next(err);
        }

        if (passportUser) {
          const user = passportUser;

          return res.json({ user: { ...user, ...user.toAuthJSON() } });
        }

        return res.status(400);
      })(req, res, next);
    });


    this.app.get('/logout', function (req, res, next) {
      req.user = null;
      
      next()

    });

    new ApolloClass(this.app);


    this.app.get('/client', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(__dirname + '/public/client/dist/index.html'));
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


  setPassport() {
    passport.use(new Strategy({
      usernameField: 'email',
      passwordField: 'password',
    }, (email, password, done) => {


      User.findOne({ email })
        .then((user) => {
          if (!user || !user.validatePassword(password)) {
            return done(null, false, { message: 'email or password is invalid' });
          }

          return done(null, user);
        }).catch(err => {
          done(err, false)
        });
    }));


    passport.serializeUser((user: any, done) => {

      if (user) {
        done(null, user._id);
      } else {
        done(null, false);
      }
    });


    passport.deserializeUser(async (id, done) => {
      try {
        const data = await User.findById(id)
        done(null, data);
      } catch (err) {
        done(err, null);
      }
    });
  }

}


export default new AppServer().app;
