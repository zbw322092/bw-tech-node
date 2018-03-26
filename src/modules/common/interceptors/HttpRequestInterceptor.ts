import { Interceptor, NestInterceptor, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import { Request } from "express";
import chalk from 'chalk';

@Interceptor()
export class HttpRequestInterceptor implements NestInterceptor {
  intercept(dataOrRequest: Request, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    const now = Date.now();

    const urlWithGreen = chalk.green(dataOrRequest.url);
    const functionCodeWithGreen = chalk.green(dataOrRequest.body.protocol.functionCode);

    return stream$.do(
      () => console.log(`[Request] route: ${urlWithGreen} - functionCode: ${functionCodeWithGreen} took ${chalk.yellowBright(`${Date.now() - now}ms`)}`)
    );
  }
}