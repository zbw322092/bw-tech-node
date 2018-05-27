import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsTags } from "./poststags.entity";
import { PermissionModule } from "../permission/permission.module";
import { RequestParamValidationMiddleware } from "../common/middlewares/RequestParamValidationMiddleware";
import { AddPostTagDto } from "./interfaces/poststags.dto";
import { PostsTagsController } from "./poststags.controller";
import { PostsTagsService } from "./poststags.service";


@Module({
  imports: [TypeOrmModule.forFeature([PostsTags]), PermissionModule],
  controllers: [PostsTagsController],
  components: [PostsTagsService]
})
export class PostsTagsModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void | MiddlewaresConsumer {
    consumer.apply(RequestParamValidationMiddleware).with(AddPostTagDto).forRoutes(
      { path: '/poststags/add_post_tag', method: RequestMethod.POST }
    )
  }
}