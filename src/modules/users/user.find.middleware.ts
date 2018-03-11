import { Middleware, HttpException, HttpStatus } from "@nestjs/common";
import { NestMiddleware, ExpressMiddleware } from "@nestjs/common/interfaces";
import { UsersService } from "./users.service";
import { Service } from "../database/service.interface";
import { User } from "./user.entity";

@Middleware()
export class UserFindMiddleware implements NestMiddleware {

  private usersService: Service<User>;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  resolve(): ExpressMiddleware {
    return async (req, res, next) => {
      if (!req.params.id) {
        throw new HttpException(
          { error: 'Something went wrong.' }, HttpStatus.INTERNAL_SERVER_ERROR
        );
      }

      const user = await this.usersService.get(req.params.id);
      if (!user) { throw new HttpException('User not found', 404); }
      req.user = user;
      next();
    }
  }
}