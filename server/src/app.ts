import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';

import * as path from 'path';
import * as passport from "passport";
import { Strategy } from "passport-local";
import ApolloClass from './apollo.class';
import { User } from './database/models';
import { auth } from './auth';



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
    this.app.use(session({ secret: 'passport', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    // this.app.use(this.authMiddle);
    new ApolloClass(this.app);


    this.app.post('/login', auth.optional, (req, res, next) => {
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
          user.token = passportUser.generateJWT();
          console.log(user.token);

          return res.json(user.toAuthJSON());
        }

        return res.status(400);
      })(req, res, next);
    });


    this.app.get('/current', auth.required, (req, res, next) => {
      const { user: { id } }: any = req;

      return User.findById(id)
        .then((user) => {
          if (!user) {
            return res.sendStatus(400);
          }

          return res.json({ user: user.toAuthJSON() });
        });
    });

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
      console.log(22222, email, password);

      User.findOne({ email })
        .then((user) => {
          if (!user || !user.validatePassword(password)) {
            return done(null, false, { message: 'email or password is invalid' });
          }

          return done(null, user);
        }).catch(done);
    }));


    passport.serializeUser((user: any, done) => {
      console.log('flksd', user);

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
