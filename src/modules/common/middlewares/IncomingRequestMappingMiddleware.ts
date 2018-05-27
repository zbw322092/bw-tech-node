import { Middleware, NestMiddleware, ExpressMiddleware } from "@nestjs/common";
import { RequestBodyDto } from "../dto/RequestBodyDto";
import functionCodeToRouteMapping from '../functionCodeToRouteMapping';
import { Response, Request, NextFunction } from "express";
import { RequestErrorException, ResourceNotFoundException } from "../exceptions/exceptions";

@Middleware()
export class IncomingRequestMappingMiddleware implements NestMiddleware {
  public resolve(...args: any[]): ExpressMiddleware {
    return (req: Request, res: Response, next: NextFunction) => {

      function requestIsValid(body: RequestBodyDto<any>): body is RequestBodyDto<any> {
        return body.protocol && typeof body.protocol.functionCode === 'string';
      }
      if (requestIsValid(req.body)) {
        const body: RequestBodyDto<any> = req.body;
        const functionCode = body.protocol.functionCode;
        const routeMapping = functionCodeToRouteMapping.get(functionCode);
        if (routeMapping) {
          req.url = routeMapping;
        } else { throw new ResourceNotFoundException(); }
      } else {
        // TODO: server log
        console.log('request protocol and functionCode required');
        throw new RequestErrorException();
      }

      next();
    }
  }
}