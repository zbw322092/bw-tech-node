import { Middleware, NestMiddleware, ExpressMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { createByFail } from "../serverResponse/ServerResponse";
import { errorAuth } from "../serverResponse/Const.Error";

@Middleware()
export class LoginMiddleware implements NestMiddleware {
  public resolve(...args: any[]): ExpressMiddleware {
    return (req: Request, res: Response, next: NextFunction) => {
      const session: any = req.session;
      if (!session.logined) {
        return res.json(createByFail({ code: errorAuth('0001'), message: 'login required' }));
      }
      next();
    }
  }
}