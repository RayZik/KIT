import { Router, Request, Response } from "express";
import * as path from 'path';



export const PublicRouter = Router();



PublicRouter.get('/client', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + '/../../public/client/dist/index.html'));
});