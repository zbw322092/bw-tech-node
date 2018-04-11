import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";
import { IncomingRequestMappingMiddleware } from "./common/middlewares/IncomingRequestMappingMiddleware";
import { InviteModule } from "./invites/invites.module";
import { RolesModule } from "./roles/roles.module";
import { CaptchaModule } from "./captcha/captcha.module";
import { RolesUsersModule } from "./rolesusers/rolesusers.module";
import nconf from "../config/config";

@Module({
  imports: [TypeOrmModule.forRoot(nconf.get('database')), UsersModule, PostsModule,
    InviteModule, RolesUsersModule, RolesModule, CaptchaModule]
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(IncomingRequestMappingMiddleware).forRoutes(
      { path: '/route', method: RequestMethod.POST }
    );
  }
}