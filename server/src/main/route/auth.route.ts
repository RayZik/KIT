import { Router, Response, NextFunction, Request } from "express";
import passport from "passport";



export const AuthRouter = Router();



AuthRouter.post('/auth/login', (req: Request, res: Response, next: NextFunction) => {

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
      return res.json({ user: passportUser.toAuthJSON() });
    }

    return res.status(400);
  })(req, res, next);
});



AuthRouter.post('/auth/logout', (req: Request, res: Response, next: NextFunction) => {
  req.user = null;
  res.json({ ok: true, location: 'logout' });
});


AuthRouter.post('/auth', (req: Request, res: Response, next: NextFunction) => {
  res.json({ ok: true, location: 'auth' });
});


AuthRouter.post('/auth/refresh', (req: Request, res: Response, next: NextFunction) => {
  res.json({ ok: true, location: 'refresh' });
});
