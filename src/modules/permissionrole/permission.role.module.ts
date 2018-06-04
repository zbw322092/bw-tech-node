import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionRole } from './permission.role.entity';
import { PermissionRoleController } from './permission.role.controller';
import { PermissionRoleService } from './permission.role.service';
import { RequestParamValidationMiddleware } from '../common/middlewares/RequestParamValidationMiddleware';
import { AddPermissionRoleDto } from './interfaces/permissionrole.dto';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionRole])],
  controllers: [PermissionRoleController],
  components: [PermissionRoleService]
})
export class PermissionRoleModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer): void | MiddlewaresConsumer {
    consumer.apply(RequestParamValidationMiddleware).with(AddPermissionRoleDto).forRoutes(
      { path: '/permissionrole/add_permission_role', method: RequestMethod.POST }
    );
  }
}