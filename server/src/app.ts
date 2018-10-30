import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';

import * as path from 'path';
import * as passport from "passport";
import { Strategy } from "passport-local";
import ApolloClass from './apollo.class';
import { User } from './database/models';
import UserQuery from './api/resolvers/user/user';



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
    this.setPassport();

    this.app.use(express.static(path.join(__dirname, 'public/client/dist')));
    this.app.use(cookieParser());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(session({ secret: 'SECRET', resave: true, saveUninitialized: true }));
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    new ApolloClass(this.app).setApollo();


    this.app.post('/login', this.authSessionMiddle, (req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.send({ success: true })
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


  /**
   * Handler for set session token
   * @param req 
   * @param res 
   * @param next 
   */
  authSessionMiddle(req, res, next) {
    passport.authenticate('local',
      function (err, user, info) {
        next(user)
        if (err) {
          next(err)
        } else {
          if (user) {
            req.logIn(user, function (error) {
              error ? next(error) : next(user);
            });
          }
        }
      }
    )(req, res, next);
  }

  setPassport() {
    passport.use(new Strategy({
      usernameField: 'email',
      passwordField: 'password'
    }, function (email: string, password: string, done) {
      UserQuery.getUser(email)
        .then((user: any) => {
          if (user.password === password) {
            done(null, user);
          } else {
            done(null, null);
          }
        })
        .catch(error => done(error, false))
    }));


    passport.serializeUser(function (user: any, done) {
      done(null, user.id);
    });


    passport.deserializeUser(function (id, done) {
      User.findById(id, function (err, user) {
        err
          ? done(err)
          : done(null, user);
      });
    });
  }

}

export default new AppServer().app;