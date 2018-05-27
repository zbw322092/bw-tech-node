import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tags } from "./tags.entity";
import { TagsController } from "./tags.controller";
import { TagsService } from "./tags.service";
import { PermissionModule } from "../permission/permission.module";
import { RequestParamValidationMiddleware } from "../common/middlewares/RequestParamValidationMiddleware";
import { AddTagDto } from "./interfaces/tags.dto";

@Module({
  imports: [TypeOrmModule.forFeature([Tags]), PermissionModule],
  controllers: [TagsController],
  components: [TagsService]
})
export class TagsModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void | MiddlewaresConsumer {
    consumer.apply(RequestParamValidationMiddleware).with(AddTagDto).forRoutes(
      { path: '/tags/add_tag', method: RequestMethod.POST }
    )
  }
}