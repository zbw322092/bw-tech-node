import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";
import { AuthModule } from "./auth/auth.module";
import { IncomingRequestMiddleware } from "./common/middlewares/IncomingRequestMiddleware";
import { AuthController } from "./auth/auth.controller";

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, PostsModule, AuthModule]
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(IncomingRequestMiddleware).forRoutes(
      { path: '/route', method: RequestMethod.POST }
    );
  }
}