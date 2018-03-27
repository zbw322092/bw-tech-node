import { HttpException, HttpStatus } from "@nestjs/common";

export class RequestErrorException extends HttpException {
  constructor() {
    super("bad request", HttpStatus.BAD_REQUEST);
  }
}

export class ResourceNotFoundException extends HttpException {
  constructor() {
    super("resource not found", HttpStatus.NOT_FOUND);
  }
}