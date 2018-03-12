import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, PostsModule]
})
export class ApplicationModule {}