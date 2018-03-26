import { Middleware, NestMiddleware, ExpressMiddleware } from "@nestjs/common";
import { RequestBodyDto } from "../dto/RequestBodyDto";
import functionCodeToRouteMapping from '../functionCodeToRouteMapping';
import { Response, Request, NextFunction } from "express";

@Middleware()
export class IncomingRequestMiddleware implements NestMiddleware {
  public resolve(...args: any[]): ExpressMiddleware {
    return (req: Request, res: Response, next: NextFunction) => {
      const body: RequestBodyDto<any> = req.body;
      const functionCode = body.protocol.functionCode;
      const routeMapping = functionCodeToRouteMapping.get(functionCode);
      if (routeMapping) {
        req.url = req.url.concat(routeMapping);
      }

      next();
    }
  }
}