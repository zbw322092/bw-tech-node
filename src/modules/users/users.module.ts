import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { InviteModule } from "../invites/invites.module";
import { RequestParamValidationMiddleware } from "../common/middlewares/RequestParamValidationMiddleware";
import { EmailAvaliableDto, NameAvaliableDto, SignupDto, ActiveAccountDto } from "./dto/users.dto";
import { RolesUsersModule } from "../rolesusers/rolesusers.module";
import { RolesModule } from "../roles/roles.module";
import { Roles } from "../roles/roles.entity";
import { RolesUsers } from "../rolesusers/rolesusers.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Users, Roles, RolesUsers]), InviteModule],
  controllers: [UsersController],
  components: [UsersService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(RequestParamValidationMiddleware).with(EmailAvaliableDto).forRoutes(
      { path: '/users/email_avaliable', method: RequestMethod.POST }
    );
    consumer.apply(RequestParamValidationMiddleware).with(NameAvaliableDto).forRoutes(
      { path: '/users/name_avaliable', method: RequestMethod.POST }
    );
    consumer.apply(RequestParamValidationMiddleware).with(SignupDto).forRoutes(
      { path: '/users/signup', method: RequestMethod.POST }
    );
    consumer.apply(RequestParamValidationMiddleware).with(ActiveAccountDto).forRoutes(
      { path: '/users/active_account', method: RequestMethod.POST }
    );
  }
}