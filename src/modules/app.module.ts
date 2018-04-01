import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";
import { AuthModule } from "./auth/auth.module";
import { IncomingRequestMappingMiddleware } from "./common/middlewares/IncomingRequestMappingMiddleware";
import { AuthController } from "./auth/auth.controller";
import { InviteModule } from "./invites/invites.module";
import { RolesModule } from "./roles/roles.module";
import { CaptchaModule } from "./captcha/captcha.module";
import { RolesUsersModule } from "./rolesusers/rolesusers.module";
import nconf from "../config/config";

@Module({
  imports: [TypeOrmModule.forRoot(nconf.get('database')), UsersModule, PostsModule, AuthModule,
    InviteModule, RolesUsersModule, RolesModule, CaptchaModule]
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(IncomingRequestMappingMiddleware).forRoutes(
      { path: '/route', method: RequestMethod.POST }
    );
  }
}