import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../users/users.entity";
import { InviteModule } from "../invites/invites.module";
import { RequestParamValidationMiddleware } from "../common/middlewares/RequestParamValidationMiddleware";
import { EmailAvaliableDto, NameAvaliableDto, SignupDto } from "./dto/auth.dto";
import { UsersModule } from "../users/users.module";
import { RolesUsersModule } from "../rolesusers/rolesusers.module";
import { RolesModule } from "../roles/roles.module";
import { Roles } from "../roles/roles.entity";
import { RolesUsers } from "../rolesusers/rolesusers.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Users, Roles, RolesUsers]), InviteModule],
  controllers: [AuthController],
  components: [AuthService]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(RequestParamValidationMiddleware).with(EmailAvaliableDto).forRoutes(
      { path: '/auth/email_avaliable', method: RequestMethod.POST }
    );
    consumer.apply(RequestParamValidationMiddleware).with(NameAvaliableDto).forRoutes(
      { path: '/auth/name_avaliable', method: RequestMethod.POST }
    );
    consumer.apply(RequestParamValidationMiddleware).with(SignupDto).forRoutes(
      { path: '/auth/signup', method: RequestMethod.POST }
    );
  }
}