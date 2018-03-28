/**
 * Check request parameters against predefined expected parameters constraints
 * Reference: https://www.worl.co/2016/12/building-an-api-backend-with-typescript-and-express---part-two-validation/
 */

import { deserialize } from 'json-typescript-mapper';
import { Validator } from "class-validator";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { RequestErrorException } from '../exceptions/exceptions';
import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';

type Constructor<T> = { new(): T };

// export function requestParamValidation<T>(type: Constructor<T>): RequestHandler {
//   const validator = new Validator();

//   return (req: Request, res: Response, next: NextFunction) => {
//     const param = req.body.param || {};
//     const requestParam = deserialize(type, param);
//     const errors = validator.validateSync(requestParam);
//     if (errors.length > 0) {
//       throw new RequestErrorException();
//     } else {
//       req.body.param = requestParam;
//       next();
//     }
//   }
// }

@Middleware()
export class RequestParamValidationMiddleware implements NestMiddleware {
  resolve(dto: any): ExpressMiddleware {
    return (req: Request, res: Response, next: NextFunction) => {
      const validator = new Validator();
      const param = req.body.param || {};
      const requestParam = deserialize(dto, param);
      const errors = validator.validateSync(requestParam);

      if (errors.length > 0) {
        throw new RequestErrorException();
      }
      
      req.body.param = requestParam;
      next();
    }
  }
}