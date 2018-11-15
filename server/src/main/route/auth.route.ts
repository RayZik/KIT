import { Router, Response, NextFunction, Request } from "express";
import { AuthModule } from "../module";



export const AuthRouter = Router();



AuthRouter.post('/auth/login', async (req: Request, res: Response, next: NextFunction) => {

  const { body: { email, password } } = req;

  if (!email) {
    res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!password) {
    res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  try {
    res.status(200).json(await AuthModule.login(email, password));
  } catch (error) {
    res.status(404).json(error);
  }
});


AuthRouter.post('/auth/refresh', async (req: Request, res: Response, next: NextFunction) => {
  const { body: { refreshToken }, headers: { authorization: token } } = req;


  if (!refreshToken) {
    res.status(422).json({
      errors: {
        refreshToken: 'is required',
      },
    });
  }

  if (!token) {
    res.status(422).json({
      errors: {
        token: 'is required',
      },
    });
  }

  try {
    res.status(200).json(await AuthModule.refreshToken(token, refreshToken));
  } catch (error) {
    res.status(404).json(error);
  }
});


AuthRouter.post('/auth/logout', async (req: Request, res: Response, next: NextFunction) => {
  res.status(200);
});
