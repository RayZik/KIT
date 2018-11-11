import passport from "passport";
import { Strategy } from "passport-local";

import { User } from "../../database/models";



function setPassport() {
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


export const PassportModule = { setPassport };