import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Posts } from "./posts.entity";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { RequestParamValidationMiddleware } from "../common/middlewares/RequestParamValidationMiddleware";
import { CreatePostDto } from "./interface/posts.dto";
import { PermissionModule } from "../permission/permission.module";

@Module({
  imports: [TypeOrmModule.forFeature([Posts]), PermissionModule],
  controllers: [PostsController],
  components: [PostsService]
})
export class PostsModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void | MiddlewaresConsumer {
    consumer.apply(RequestParamValidationMiddleware).with(CreatePostDto).forRoutes(
      { path: '/posts/create_post', method: RequestMethod.POST }
    )
  }
}