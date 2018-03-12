import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Posts } from "./posts.entity";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";

@Module({
  imports: [TypeOrmModule.forFeature([Posts])],
  controllers: [PostsController],
  components: [PostsService]
})
export class PostsModule {}