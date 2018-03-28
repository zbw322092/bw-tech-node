import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";
import { AuthModule } from "./auth/auth.module";
import { IncomingRequestMappingMiddleware } from "./common/middlewares/IncomingRequestMappingMiddleware";
import { AuthController } from "./auth/auth.controller";
import { InviteModule } from "./invites/invites.module";
import { RolesModule } from "./roles/roles.module";

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, PostsModule, AuthModule, InviteModule, RolesModule]
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(IncomingRequestMappingMiddleware).forRoutes(
      { path: '/route', method: RequestMethod.POST }
    );
  }
}