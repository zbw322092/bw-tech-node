import { NestModule, MiddlewaresConsumer } from "@nestjs/common/interfaces";
import { UserFindMiddleware } from "./user.find.middleware";
import { RequestMethod, Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  modules: [DatabaseModule],
  controllers: [UsersController],
  components: [UsersService]
})
export class UsersModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer.apply(UserFindMiddleware).forRoutes({
      path: 'users/:id', method: RequestMethod.ALL
    });
  }
}