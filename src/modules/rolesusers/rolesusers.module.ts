import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesUsers } from './rolesusers.entity';
import { RolesUsersService } from './rolesusers.service';
import { RequestParamValidationMiddleware } from '../common/middlewares/RequestParamValidationMiddleware';
import { AddRolesUsersDto, UpdateRolesUsersDto } from './interfaces/rolesusers.dto';
import { RolesUsersController } from './rolesusers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RolesUsers])],
  controllers: [RolesUsersController],
  components: [RolesUsersService],
  exports: [RolesUsersService]
})
export class RolesUsersModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer): void | MiddlewaresConsumer {
    consumer.apply(RequestParamValidationMiddleware).with(AddRolesUsersDto).forRoutes(
      { path: '/rolesusers/add_roles_users', method: RequestMethod.POST }
    );

    consumer.apply(RequestParamValidationMiddleware).with(UpdateRolesUsersDto).forRoutes(
      { path: '/rolesusers/update_roles_users', method: RequestMethod.POST }
    );
  }
}